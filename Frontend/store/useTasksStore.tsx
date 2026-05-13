import { create } from 'zustand';
import { TaskPriority, TaskStatus, Task } from '@shared/types';

type TasksState = {
    tasks: Task[],

    updateTask: (id: string, updateData: Partial<Task>) => void,
    initTask: () => Promise<void>,
    createTask: (task: Task) => void,
    deleteTask: (id: string) => void
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
            priority: TaskPriority.Medium,
            status: TaskStatus.InProgress,
            dateStarted: new Date("2026-05-01"),
            dateEnd: new Date("2026-05-11")
          },
          {
            id: "2",
            name: "Інтеграція API",
            description: "Підключити REST API до фронтенду",
            priority: TaskPriority.Medium,
            status: TaskStatus.Done,
            dateStarted: new Date("2026-04-15"),
            dateEnd: new Date("2026-05-11")
          },
          {
            id: "3",
            name: "Написання тестів",
            description: "Додати unit тести для сервісів",
            priority: TaskPriority.Low,
            status: TaskStatus.Expired,
            dateStarted: new Date("2026-03-10"),
            dateEnd: new Date("2026-05-13")
          },
          {
            id: "4",
            name: "Оптимізація продуктивності",
            description: "Покращити швидкість завантаження сторінок",
            priority: TaskPriority.High,
            status: TaskStatus.InProgress,
            dateStarted: new Date("2026-05-05"),
            dateEnd: new Date("2026-05-13")
          }
        ];
        set({ tasks: tasks_start });
    },

    createTask: (task) => {
        set((state) => ({
            tasks: [...state.tasks, task]
        }));
    },

    deleteTask: (id) => {
        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id)
        }));
    }
}));