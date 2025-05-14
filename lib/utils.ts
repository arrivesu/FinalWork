import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {ActivityJoinAPI, MemberAPI} from "@/lib/api";

// tailwind css utils
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// my tools
export enum TimeFilterType {
  BEFORE = "before",
  COMPLETE = "after",
  ALL = "all",
}

export const isComplete = <T extends { date: Date }>(event: T) => {
  return new Date() > event.date;
}

export const getStatus = <T extends { date: Date }>(event: T) => isComplete(event)? '已完成': '未完成';

export const timeFilter = (time: Date, filter: TimeFilterType) => {
  switch (filter) {
    case TimeFilterType.BEFORE:
      return new Date() > time;
    case TimeFilterType.COMPLETE:
      return new Date() <= time;
    case TimeFilterType.ALL:
      return true;
  }
}

export const getActivityMember = (activity: ActivityType): MemberType[] => {
  const join_list = ActivityJoinAPI.get();
  return join_list
      .filter((join_item) => join_item.activity.id === activity.id)
      .map((join_item) => join_item.member);
}

export const getBranchMember = (branch: BranchType) => {
  const member_list = MemberAPI.get();
  return member_list.filter((member) => member.branch.id === branch.id)
}

export function formatDateFlexible(date: Date, template = 'YYYY-MM-DD HH:mm:ss'): string {
  const padZero = (n: number): string => n.toString().padStart(2, '0');

  const replacements: { [key: string]: string } = {
    YYYY: date.getFullYear().toString(),
    MM: padZero(date.getMonth() + 1),
    DD: padZero(date.getDate()),
    HH: padZero(date.getHours()),
    mm: padZero(date.getMinutes()),
    ss: padZero(date.getSeconds()),
  };

  return Object.entries(replacements).reduce(
      (acc, [key, value]) => acc.replace(key, value),
      template
  );
}

export const getDateTimeParts = (date: Date) => {
  return formatDateFlexible(date, "YYYY-MM-DD");
}

export const getDayTimeParts = (date: Date) => {
  return formatDateFlexible(date, "HH:mm:ss");
}
