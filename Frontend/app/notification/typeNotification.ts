// types/notification.ts
export enum AlertType {
  Tips = 'Tips',
  Progress = 'Progress',
  Update = 'Update',
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  type: AlertType;
  isRead: boolean;
  subtitle?: string;
}