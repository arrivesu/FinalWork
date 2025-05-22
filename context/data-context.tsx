"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { API } from "@/lib/api"

interface APIType<T> {
  data: T[]
  createEmpty(): T
  add(new_data: T): Promise<boolean>
  del(id: number): Promise<boolean>
  save(new_data: T): Promise<boolean>
  get(): Promise<boolean>
}

// Define the shape of our context data
interface DataContextType {
  // Loading states
  loading: boolean

  EventAPI: APIType<EventType>
  NoticeAPI: APIType<NoticeType>
  BranchAPI: APIType<BranchType>
  MemberAPI: APIType<MemberType>
  TransferAPI: APIType<TransferType>
  MaterialAPI: APIType<MaterialType>
  UserDataAPI: APIType<UserDataType>
  ActivitiesAPI: APIType<ActivityType>
  UserDocumentAPI: APIType<UserDocumentType>
  ActivityJoinAPI: APIType<ActivityJoinType>

  // Utility functions
  refreshData: () => Promise<void>
}

// Create the context with a default undefined value
const DataContext = createContext<DataContextType | undefined>(undefined)

// Provider component
export function DataProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)

  const [activities, setActivities] = useState<ActivityType[]>([])
  const [activityJoins, setActivityJoins] = useState<ActivityJoinType[]>([])
  const [branches, setBranches] = useState<BranchType[]>([])
  const [events, setEvents] = useState<EventType[]>([])
  const [materials, setMaterials] = useState<MaterialType[]>([])
  const [members, setMembers] = useState<MemberType[]>([])
  const [notices, setNotices] = useState<NoticeType[]>([])
  const [transfers, setTransfers] = useState<TransferType[]>([])
  const [userData, setUserData] = useState<UserDataType[]>([])
  const [userDocuments, setUserDocuments] = useState<UserDocumentType[]>([])

  const EventAPI = {
    data: events,
    createEmpty(): EventType {
      return {
        id: 0,
        user: MemberAPI.createEmpty(),
        time: new Date(),
        module: null,
        status: "success",
        ip: "",
        target: null,
        content: "",
      }
    },
    async add(new_data: EventType) {
      try {
        const new_id = await API.post<number>("/event", new_data)
        setEvents((prev) => [...prev, { ...new_data, id: new_id }])
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async del(id: number) {
      try {
        const res = await API.delete<boolean>(`/event/${id}`)
        if (res) {
          setEvents((prev) => prev.filter((d) => d.id !== id))
          return true
        }
        return false
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async save(new_data: EventType) {
      try {
        const res = await API.put<boolean>(`/event/${new_data.id}`, new_data)
        if (res) {
          setEvents((prev) => prev.map((d) => (d.id !== new_data.id ? d : new_data)))
          return true
        }
        return false
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async get() {
      try {
        const new_data = await API.get<EventType[]>("/event")
        setEvents(new_data)
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },
  }
  const NoticeAPI = {
    data: notices,
    createEmpty(): NoticeType {
      return {
        id: 0,
        title: "",
        content: "",
        publish_date: new Date(),
        publisher: MemberAPI.createEmpty(),
      }
    },
    async add(new_data: NoticeType) {
      try {
        const new_id = await API.post<number>("/notice", new_data)
        setNotices((prev) => [...prev, { ...new_data, id: new_id }])
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async del(id: number) {
      try {
        const res = await API.delete<boolean>(`/notice/${id}`)
        if (res) {
          setNotices((prev) => prev.filter((d) => d.id !== id))
          return true
        }
        return false
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async save(new_data: NoticeType) {
      try {
        const res = await API.put<boolean>(`/notice/${new_data.id}`, new_data)
        if (res) {
          setNotices((prev) => prev.map((d) => (d.id !== new_data.id ? d : new_data)))
          return true
        }
        return false
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async get() {
      try {
        const new_data = await API.get<NoticeType[]>("/notice")
        setNotices(new_data)
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },
  }
  const BranchAPI = {
    data: branches,
    createEmpty(): BranchType {
      return {
        id: 0,
        name: "",
        superior_org: "",
      }
    },
    async add(new_data: BranchType) {
      try {
        const new_id = await API.post<number>("/branch", new_data)
        setBranches((prev) => [...prev, { ...new_data, id: new_id }])
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async del(id: number) {
      try {
        const res = await API.delete<boolean>(`/branch/${id}`)
        if (res) {
          setBranches((prev) => prev.filter((d) => d.id !== id))
          return true
        }
        return false
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async save(new_data: BranchType) {
      try {
        const res = await API.put<boolean>(`/branch/${new_data.id}`, new_data)
        if (res) {
          setBranches((prev) => prev.map((d) => (d.id !== new_data.id ? d : new_data)))
          return true
        }
        return false
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async get() {
      try {
        const new_data = await API.get<BranchType[]>("/branch")
        setBranches(new_data)
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },
  }
  const MemberAPI = {
    data: members,
    createEmpty(): MemberType {
      return {
        id: 0,
        is_deleted: false,
        is_init_password: false,
        username: "",
        avatar: "",
        name: "",
        gender: "女",
        ethnicity: "",
        birth_date: new Date(),
        student_number: "",
        class_name: "",
        join_date: new Date(),
        party_position: null,
        identity_type: "正式党员",
        phone: "",
        profile_file: "",
        branch: BranchAPI.createEmpty(),
        role: ["member"],
      }
    },
    async add(new_data: MemberType) {
      try {
        const new_id = await API.post<number>("/member", new_data)
        setMembers((prev) => [...prev, { ...new_data, id: new_id }])
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async del(id: number) {
      try {
        const res = await API.delete<boolean>(`/member/${id}`)
        if (res) {
          setMembers((prev) => prev.filter((d) => d.id !== id))
          return true
        }
        return false
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async save(new_data: MemberType) {
      try {
        const res = await API.put<boolean>(`/member/${new_data.id}`, new_data)
        if (res) {
          setMembers((prev) => prev.map((d) => (d.id !== new_data.id ? d : new_data)))
          return true
        }
        return false
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async get() {
      try {
        const new_data = await API.get<MemberType[]>("/member")
        setMembers(new_data)
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },
  }
  const TransferAPI = {
    data: transfers,
    createEmpty(): TransferType {
      return {
        id: 0,
        user: MemberAPI.createEmpty(),
        targetOrganization: BranchAPI.createEmpty(),
        reason: "",
        applyDate: new Date(),
        status: "pending",
      }
    },
    async add(new_data: TransferType) {
      try {
        const new_id = await API.post<number>("/transfer", new_data)
        setTransfers((prev) => [...prev, { ...new_data, id: new_id }])
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async del(id: number) {
      try {
        const res = await API.delete<boolean>(`/transfer/${id}`)
        if (res) {
          setTransfers((prev) => prev.filter((d) => d.id !== id))
          return true
        }
        return false
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async save(new_data: TransferType) {
      try {
        const res = await API.put<boolean>(`/transfer/${new_data.id}`, new_data)
        if (res) {
          setTransfers((prev) => prev.map((d) => (d.id !== new_data.id ? d : new_data)))
          return true
        }
        return false
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async get() {
      try {
        const new_data = await API.get<TransferType[]>("/transfer")
        setTransfers(new_data)
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },
  }
  const MaterialAPI = {
    data: materials,
    createEmpty(): MaterialType {
      return {
        id: 0,
        title: "",
        type: "video",
        category: "理论学习",
        content: "",
        upload_date: new Date(),
        branch: BranchAPI.createEmpty(),
      }
    },
    async add(new_data: MaterialType) {
      try {
        const new_id = await API.post<number>("/material", new_data)
        setMaterials((prev) => [...prev, { ...new_data, id: new_id }])
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async del(id: number) {
      try {
        const res = await API.delete<boolean>(`/material/${id}`)
        if (res) {
          setMaterials((prev) => prev.filter((d) => d.id !== id))
          return true
        }
        return false
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async save(new_data: MaterialType) {
      try {
        const res = await API.put<boolean>(`/material/${new_data.id}`, new_data)
        if (res) {
          setMaterials((prev) => prev.map((d) => (d.id !== new_data.id ? d : new_data)))
          return true
        }
        return false
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async get() {
      try {
        const new_data = await API.get<MaterialType[]>("/material")
        setMaterials(new_data)
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },
  }
  const UserDataAPI = {
    data: userData,
    createEmpty(): UserDataType {
      return {
        id: 0,
        user: MemberAPI.createEmpty(),
        record_time: "",
        moral_rank: 0,
        academic_rank: 0,
        assessment_score: 0,
        dorm_score: 0,
        behavior_score: 0,
        volunteering_time: 0,
        public_opinion_score: 0,
      }
    },
    async add(new_data: UserDataType) {
      try {
        const new_id = await API.post<number>("/user/data", new_data)
        setUserData((prev) => [...prev, { ...new_data, id: new_id }])
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async del(id: number) {
      try {
        const res = await API.delete<boolean>(`/user/data/${id}`)
        if (res) {
          setUserData((prev) => prev.filter((d) => d.id !== id))
          return true
        }
        return false
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async save(new_data: UserDataType) {
      try {
        const res = await API.put<boolean>(`/user/data/${new_data.id}`, new_data)
        if (res) {
          setUserData((prev) => prev.map((d) => (d.id !== new_data.id ? d : new_data)))
          return true
        }
        return false
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async get() {
      try {
        const new_data = await API.get<UserDataType[]>("/user/data")
        setUserData(new_data)
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },
  }
  const ActivitiesAPI = {
    data: activities,
    createEmpty(): ActivityType {
      return {
        id: 0,
        title: "",
        type: "支部党员大会",
        startTime: new Date(),
        endTime: new Date(),
        location: "",
        content: "",
        remark: "",
        branch: BranchAPI.createEmpty(),
      }
    },
    async add(new_data: ActivityType) {
      try {
        const new_id = await API.post<number>("/activity", new_data)
        setActivities((prev) => [...prev, { ...new_data, id: new_id }])
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async del(id: number) {
      try {
        const res = await API.delete<boolean>(`/activity/${id}`)
        if (res) {
          setActivities((prev) => prev.filter((d) => d.id !== id))
          return true
        }
        return false
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async save(new_data: ActivityType) {
      try {
        const res = await API.put<boolean>(`/activity/${new_data.id}`, new_data)
        if (res) {
          setActivities((prev) => prev.map((d) => (d.id !== new_data.id ? d : new_data)))
          return true
        }
        return false
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async get() {
      try {
        const new_data = await API.get<ActivityType[]>("/activity")
        setActivities(new_data)
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },
  }
  const UserDocumentAPI = {
    data: userDocuments,
    createEmpty(): UserDocumentType {
      return {
        id: 0,
        user: MemberAPI.createEmpty(),
        type: "",
        submit_time: new Date(),
        content: "",
      }
    },
    async add(new_data: UserDocumentType) {
      try {
        const new_id = await API.post<number>("/user/document", new_data)
        setUserDocuments((prev) => [...prev, { ...new_data, id: new_id }])
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async del(id: number) {
      try {
        const res = await API.delete<boolean>(`/user/document/${id}`)
        if (res) {
          setUserDocuments((prev) => prev.filter((d) => d.id !== id))
          return true
        }
        return false
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async save(new_data: UserDocumentType) {
      try {
        const res = await API.put<boolean>(`/user/document/${new_data.id}`, new_data)
        if (res) {
          setUserDocuments((prev) => prev.map((d) => (d.id !== new_data.id ? d : new_data)))
          return true
        }
        return false
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async get() {
      try {
        const new_data = await API.get<UserDocumentType[]>("/user/document")
        setUserDocuments(new_data)
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },
  }
  const ActivityJoinAPI = {
    data: activityJoins,
    createEmpty(): ActivityJoinType {
      return {
        id: 0,
        activity: ActivitiesAPI.createEmpty(),
        member: MemberAPI.createEmpty(),
        status: "正常参会",
      }
    },
    async add(new_data: ActivityJoinType) {
      try {
        const new_id = await API.post<number>("/activity/join", new_data)
        setActivityJoins((prev) => [...prev, { ...new_data, id: new_id }])
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async del(id: number) {
      try {
        const res = await API.delete<boolean>(`/activity/join/${id}`)
        if (res) {
          setActivityJoins((prev) => prev.filter((d) => d.id !== id))
          return true
        }
        return false
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async save(new_data: ActivityJoinType) {
      try {
        const res = await API.put<boolean>(`/activity/join/${new_data.id}`, new_data)
        if (res) {
          setActivityJoins((prev) => prev.map((d) => (d.id !== new_data.id ? d : new_data)))
          return true
        }
        return false
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async get() {
      try {
        const new_data = await API.get<ActivityJoinType[]>("/activity/join")
        setActivityJoins(new_data)
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },
  }

  // Fix the addActivity function to properly handle activity creation
  const addActivity = async (activity: ActivityType) => {
    try {
      // Add the activity to the activities array
      setActivities((prev) => [...prev, activity])
      return true
    } catch (error) {
      console.error("Error adding activity:", error)
      return false
    }
  }

  // Fix the updateActivity function to properly handle activity updates
  const updateActivity = async (id: number, activity: ActivityType) => {
    try {
      // Update the activity in the activities array
      setActivities((prev) => prev.map((a) => (a.id === id ? activity : a)))
      return true
    } catch (error) {
      console.error("Error updating activity:", error)
      return false
    }
  }

  // Fix the updateActivityJoin function to properly handle activity join updates
  const updateActivityJoin = async (id: number, join: ActivityJoinType) => {
    try {
      // Check if the join already exists
      const existingJoin = activityJoins.find((j) => j.id === id)

      if (existingJoin) {
        // Update the existing join
        setActivityJoins((prev) => prev.map((j) => (j.id === id ? join : j)))
      } else {
        // Add a new join
        setActivityJoins((prev) => [...prev, join])
      }

      return true
    } catch (error) {
      console.error("Error updating activity join:", error)
      return false
    }
  }

  // Function to fetch all data
  const fetchAllData = async () => {
    try {
      setLoading(true)

      // Fetch all data in parallel
      await Promise.all([
        ActivitiesAPI.get(),
        ActivityJoinAPI.get(),
        BranchAPI.get(),
        EventAPI.get(),
        MaterialAPI.get(),
        MemberAPI.get(),
        NoticeAPI.get(),
        TransferAPI.get(),
        UserDataAPI.get(),
        UserDocumentAPI.get(),
      ])
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch data on initial load
  useEffect(() => {
    fetchAllData()
  }, [])

  // Function to refresh all data
  const refreshData = async () => {
    await fetchAllData()
  }

  const contextValue = {
    loading: loading,

    EventAPI: EventAPI,
    NoticeAPI: NoticeAPI,
    BranchAPI: BranchAPI,
    MemberAPI: MemberAPI,
    TransferAPI: TransferAPI,
    MaterialAPI: MaterialAPI,
    UserDataAPI: UserDataAPI,
    ActivitiesAPI: ActivitiesAPI,
    UserDocumentAPI: UserDocumentAPI,
    ActivityJoinAPI: ActivityJoinAPI,

    // Utility functions
    refreshData: refreshData,
  }

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
}

// Custom hook to use the data context
export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
