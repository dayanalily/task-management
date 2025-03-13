import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchTasks as fetchTasksFromService } from "../services/taskService";

export type Task = {
    id: number;
    title: string;
    completed: boolean;
};

type TaskState = {
    tasks: Task[];
    addTask: (title: string) => void;
    toggleTaskCompletion: (taskId: number) => void;
    deleteTask: (taskId: number) => void;
    fetchTasks: () => Promise<void>;
    updateTaskStatus: (taskId: number, isCompleted: boolean) => void;
};

export const useTaskStore = create<TaskState>()(
    persist(
        (set) => ({
            tasks: [],

            fetchTasks: async () => {
                try {
                  const data = await fetchTasksFromService();
                  set({ tasks: data });
                } catch (error) {
                  console.error(error);
                }
              },

            addTask: (title) =>
                set((state) => ({
                    tasks: [...state.tasks, { id: Date.now(), title, completed: false }],
                })),

            toggleTaskCompletion: (taskId) =>
                set((state) => ({
                    tasks: state.tasks.map((task) =>
                        task.id === taskId ? { ...task, completed: !task.completed } : task
                    ),
                })),
            updateTaskStatus: (taskId: number, isCompleted: boolean) =>
                set((state) => ({
                    tasks: state.tasks.map((task) =>
                        task.id === taskId ? { ...task, completed: isCompleted } : task
                    ),
                })),

            deleteTask: (taskId) =>
                set((state) => ({
                    tasks: state.tasks.filter((task) => task.id !== taskId),
                })),
        }),
        { name: "task-storage" }
    )
);
