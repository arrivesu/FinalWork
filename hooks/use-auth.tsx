/**
 * @file use-auth.tsx.tsx
 * @description
 * @author rainbowx
 * @date 2025/5/14
 */
"use client"

import React from 'react';

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {AuthAPI} from "@/lib/api";

type AuthContextType = {
	user: MemberType | null
	loading: boolean
	login: (email: string, password: string) => Promise<void>
	logout: () => Promise<void>
	getUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<MemberType | null>(null)
	const [loading, setLoading] = useState(true)
	const router = useRouter()

	// Check if user is logged in on initial load
	useEffect(() => {
		getUser()
	}, [])

	const login = async (email: string, password: string) => {
		try {
			setLoading(true)

			const response = await AuthAPI.login(email, password);

			if (response.status === 'reject') {
				throw new Error(response.reason || "登录失败")
			}

			await getUser()
			router.push("/dashboard") // Redirect to dashboard after login
		} catch (error) {
			console.error("Login error:", error)
			throw error
		} finally {
			setLoading(false)
		}
	}

	const logout = async () => {
		try {
			setLoading(true)
			await AuthAPI.logout();
			setUser(null)
			router.push("/login")
		} catch (error) {
			console.error("Logout error:", error)
		} finally {
			setLoading(false)
		}
	}

	const getUser = async () => {
		try {
			setLoading(true)
			const storageUser = localStorage.getItem('curUser');
			console.log(`storageUser: ${storageUser}`)
			if(storageUser !== null) {
				const curUser = JSON.parse(storageUser);
				setUser(curUser)
			}
			const curUser = await AuthAPI.me();
			localStorage.setItem('curUser', JSON.stringify(curUser));
			setUser(curUser)
		} catch (error) {
			console.error("Get user error:", error)
			setUser(null)
		} finally {
			setLoading(false)
		}
	}

	return <AuthContext.Provider value={{ user, loading, login, logout, getUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider")
	}
	return context
}
