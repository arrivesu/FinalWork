import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {ActivityJoinAPI, MemberAPI} from "@/lib/api";

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(duration);
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

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

export function getCurrentSemesterRange(): { start: Date; end: Date } {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 注意：getMonth() 是从 0 开始的

  if (month >= 1 && month <= 6) {
    // 春季学期：2月1日 到 7月15日
    return {
      start: new Date(year, 1, 1),  // 2月1日
      end: new Date(year, 6, 15)    // 7月15日
    };
  } else {
    // 秋季学期：8月15日 到 次年1月15日
    return {
      start: new Date(year, 7, 15), // 8月15日
      end: new Date(year + 1, 0, 15) // 次年1月15日
    };
  }
}

export function getCurrentSemesterActivityCount(activities: ActivityType[]): number {
  const { start, end } = getCurrentSemesterRange();

  return activities.filter(activity => {
    const date = new Date(activity.date); // 确保是 Date 对象
    return date >= start && date <= end;
  }).length;
}

export function diffInYMD(from: Date, to: Date): { years: number, months: number, days: number } {
  let start = dayjs(from);
  let end = dayjs(to);

  if (start.isAfter(end)) {
    [start, end] = [end, start]; // 交换顺序，确保 start <= end
  }

  let years = end.year() - start.year();
  let months = end.month() - start.month();
  let days = end.date() - start.date();

  if (days < 0) {
    // 借上一个月的天数
    months -= 1;
    const prevMonth = end.subtract(1, 'month');
    days += prevMonth.daysInMonth();
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days };
}
