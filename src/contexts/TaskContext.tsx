import { createContext, useContext, useState, useEffect } from "react";
import { Task } from "../types/task";
import { fetchTasks } from "../services/taskService";

type TaskContextType = {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTaskCompletion: (taskId: number) => void;
  deleteTask: (taskId: number) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { readonly children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      const loadedTasks = await fetchTasks();
      setTasks(loadedTasks);
    };
    loadTasks();
  }, []);

  const addTask = (title: string) => {
    const newTask: Task = { id: Date.now(), title, completed: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTaskCompletion, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTaskContext must be used within a TaskProvider");
  return context;
}
