import { useState } from 'react';
import { useTasksStore } from '@/store/useTasksStore';
import { Task, TaskStatus } from '@shared/types';
import { useRouter } from 'expo-router';

export type Props = {
  task: Task;
};

export function useCreateTask({ task }: Props) {
  const router = useRouter();
  const createTask = useTasksStore((state) => state.createTask);
  const updateTask = useTasksStore((state) => state.updateTask);
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [date, setDate] = useState<Date>(task.dateEnd);
  const [status, setStatus] = useState(task.status);
  const [submitted, setSubmitted] = useState(false);

  const errors = {
    name: name.trim().length === 0 || name.trim().length < 3 || name.trim().length > 100,
    description: description.trim().length === 0 || description.trim().length < 10 || description.trim().length > 500,
  };

  const isValid = Object.values(errors).every((e) => e === false);

  const handleSave = async () => {
    setSubmitted(true);
    if (!isValid) return;
    try {
      createTask({
        name: name.trim(),
        description: description.trim(),
        priority,
        dateEnd: date,
        dateStarted: new Date(),
        id: Math.random().toString(),
        status,
      });
      router.back();

    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdate = async () => {
    setSubmitted(true);
    if (!isValid) return;
    try {
      updateTask(task.id, {
        name: name.trim(),
        description: description.trim(),
        priority,
        dateEnd: date,
        status,
      });
      router.back();

    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return {
    name, setName,
    description, setDescription,
    priority, setPriority,
    date, setDate,
    isValid,
    errors: {
      name: submitted && errors.name, 
      description: submitted && errors.description,
    },
    handleSave,
    handleUpdate,
  };
}

export function useChangeStatusTask() {
  const updateTask = useTasksStore((state) => state.updateTask);
  
  const changeStatus = (taskId: string, newStatus: TaskStatus) => {
    updateTask(taskId, { status: newStatus });
  };

  return { changeStatus };
}

export function useDeleteTask() {
  const router = useRouter();
  const deleteTask = useTasksStore((state) => state.deleteTask)

  const handleDelete = (taskId: string) => {
    deleteTask(taskId);
    router.back();
  };

  return { handleDelete };
}
