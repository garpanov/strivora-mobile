import { Task } from "@/store/useTasksStore";

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
