import { create } from 'zustand';
import { TaskPriority, TaskStatus } from '@shared/types';

export type Task = {
    id: string,
    name: string,
    description: string,
    priority: TaskPriority,
    status: TaskStatus,

    dateStarted: Date,
    dateEnd: Date
}

type TasksState = {
    tasks: Task[],

    updateTask: (id: string, updateData: Partial<Task>) => void,
    initTask: () => Promise<void>

}

export const useTasksStore = create<TasksState>((set) => ({
    tasks: [],

    updateTask: (id, updateTask) => {
        set((state) => {
            const updatedTasks = state.tasks.map((t) => {
                if (t.id === id) {
                    return { ...t, ...updateTask };
                }
                return t;
            });

            return { tasks: updatedTasks };
        });
        },
    initTask: async () => {
        const tasks_start: Task[] = [
          {
            id: "1",
            name: "Розробка UI",
            description: "Створити інтерфейс для сторінки задач",
            priority: TaskPriority.High,
            status: TaskStatus.InProgress,
            dateStarted: new Date("2026-05-01"),
            dateEnd: new Date("2026-05-10")
          },
          {
            id: "2",
            name: "Інтеграція API",
            description: "Підключити REST API до фронтенду",
            priority: TaskPriority.Medium,
            status: TaskStatus.Done,
            dateStarted: new Date("2026-04-15"),
            dateEnd: new Date("2026-05-7")
          },
          {
            id: "3",
            name: "Написання тестів",
            description: "Додати unit тести для сервісів",
            priority: TaskPriority.Low,
            status: TaskStatus.Expired,
            dateStarted: new Date("2026-03-10"),
            dateEnd: new Date("2026-05-7")
          },
          {
            id: "4",
            name: "Оптимізація продуктивності",
            description: "Покращити швидкість завантаження сторінок",
            priority: TaskPriority.High,
            status: TaskStatus.InProgress,
            dateStarted: new Date("2026-05-05"),
            dateEnd: new Date("2026-05-8")
          }
        ];
        set({ tasks: tasks_start });
    }
    
}));