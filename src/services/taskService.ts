import { Task } from "../types/task";

const API_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5";

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error fetching tasks");
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
