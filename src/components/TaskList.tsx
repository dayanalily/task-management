import { useTaskStore } from "../store/taskStore";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
