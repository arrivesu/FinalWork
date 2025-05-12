/**
 * @file event.ts
 * @description
 * @author rainbowx
 * @date 2025/5/12
 */
import {eventData} from "@/lib/mock/event";

export const EventAPI = {
	get(): EventType[] {
		return eventData;
	}
}
