export enum TaskPriority {
  Low = "Low",
  Medium = "Medium",
  High = "High"
}

export enum TaskStatus {
  InProgress = "InProgress",
  Done = "Done",
  Expired = "Expired"
}

export type Task = {
    id: string,
    name: string,
    description: string,
    priority: TaskPriority,
    status: TaskStatus,

    dateStarted: Date,
    dateEnd: Date
}
