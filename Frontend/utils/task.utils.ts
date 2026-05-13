import { Task, TaskPriority, TaskStatus } from "@shared/types";

export const getTasksEndingToday = (tasks: Task[]): Task[] => {
  const today = new Date();

  return tasks
    .filter(task => {
      const endDate = new Date(task.dateEnd);

      return (
        endDate.getFullYear() === today.getFullYear() &&
        endDate.getMonth() === today.getMonth() &&
        endDate.getDate() === today.getDate()
      );
    })
    .sort((a, b) => a.dateEnd.getTime() - b.dateEnd.getTime());
};


export function filterTasksByDate(tasks: Task[], filter: string): Task[] {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const PRIORITY_ORDER: Record<TaskPriority, number> = {
    [TaskPriority.High]: 0,
    [TaskPriority.Medium]: 1,
    [TaskPriority.Low]: 2,
  };

  const filtered = tasks.filter((task) => {
    const taskDate = new Date(task.dateEnd);
    const taskDay = new Date(taskDate.getFullYear(), taskDate.getMonth(), taskDate.getDate());
    const diffDays = Math.floor((taskDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    switch (filter) {
      case 'today':   return diffDays === 0;
      case 'tomorrow': return diffDays === 1;
      case 'week':    return diffDays >= 0 && diffDays <= 6;
      case 'month':
        return (
          taskDate.getFullYear() === now.getFullYear() &&
          taskDate.getMonth() === now.getMonth() &&
          diffDays >= 0
        );
      case 'year':  return taskDate.getFullYear() === now.getFullYear() && diffDays >= 0;
      case 'other': return diffDays < 0;
      default:      return true;
    }
  });

  return filtered.sort((a, b) => {
    const aDone = a.status === TaskStatus.Done ? 1 : 0;
    const bDone = b.status === TaskStatus.Done ? 1 : 0;

    if (aDone !== bDone) return aDone - bDone;

    return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
  });
}