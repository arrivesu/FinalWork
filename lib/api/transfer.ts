/**
 * @file transfer.ts
 * @description
 * @author rainbowx
 * @date 2025/5/13
 */
import {transferData} from "@/lib/mock/transfer";

export const TransferAPI = {
	get(): TransferDataType[] {
		return transferData;
	}
}
