/**
 * @file userDocument.ts
 * @description
 * @author rainbowx
 * @date 2025/5/15
 */

import {userDocumentData} from "@/lib/mock/userDocument";

export const UserDocumentAPI = {
	get(): UserDocumentType[] {
		return userDocumentData;
	}
}
