export enum PriorityType {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export const PRIORITY_TYPE_LABEL: Record<PriorityType, string> = {
  [PriorityType.HIGH]: '高',
  [PriorityType.MEDIUM]: '中',
  [PriorityType.LOW]: '低'
};

export interface Task {
  uuid: string
  title: string
  summary: string
  date: string
  address?: string
  participant?: string
  priorityType?: string
  thought?: string
}

export interface FetchTasksOptions {
  date?: string
}

export type SearchDateOption = {
  value: string
  placeholder?: string
};