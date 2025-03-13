import { useTaskStore, Task } from "../store/taskStore";
import {
    TrashIcon, CheckCircleIcon
} from '@heroicons/react/24/outline'

type Props = {
    readonly task: Task;
};

export default function TaskItem({ task }: Props) {
    const toggleTaskCompletion = useTaskStore((state) => state.toggleTaskCompletion);
    const deleteTask = useTaskStore((state) => state.deleteTask);
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        deleteTask(task.id);
    };

    return (
        <div
            className={`${task.completed ? "line-through text-gray-500 border-green-700" : "border-yellow-600 text-gray-800"
            } border-l-4 flex items-center justify-between p-4 bg-white rounded-lg shadow-sm 
                 hover:shadow-sm transition-all`}
        >
            <span className={`${task.completed ? "line-through text-gray-500" : "text-gray-800"
                }`}>
                {task.title}
            </span>


            <div className="flex items-center">


                {!task.completed && (

                    <div className="relative group flex">
                        <button
                            onClick={() => toggleTaskCompletion(task.id)}
                            className="text-gray-900 hover:text-gray-900 hover:bg-gray-200 bg-gray-100 transition-all duration-200 px-1 py-1 rounded-md"
                            aria-label="Mark as completed"
                        >
                            <CheckCircleIcon className="h-5 w-5" />
                        </button>

                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 text-sm text-white bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                            Mark as completed
                        </div>
                    </div>
                )}

                <div className="relative group flex">
                    <button
                        onClick={handleDelete}
                        className="text-gray-900 hover:text-gray-900 hover:bg-gray-200 bg-gray-100 transition-all duration-200 px-1 py-1 rounded-md ml-3"
                        aria-label="Delete task"
                    >
                        <TrashIcon className="h-5 w-5" />
                    </button>

                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 text-sm text-white bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                        Delete task
                    </div>
                </div>
            </div>
        </div>
    );
}