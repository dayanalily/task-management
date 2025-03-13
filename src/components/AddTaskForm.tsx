import { useState } from "react";
import { useTaskStore } from "../store/taskStore";

type AddTaskFormProps = {
    onClose?: () => void;
};

export default function AddTaskForm({ onClose }: Readonly<AddTaskFormProps>) {
    const addTask = useTaskStore((state) => state.addTask);
    const [title, setTitle] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        addTask(title);
        setTitle("");
        onClose?.();
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-12">
                <div className="col-span-full">

                    <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-gray-700">
                            <input
                                type="text"
                                id="taskTitle"
                                name="taskTitle"
                                placeholder="Description..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                            />
                        </div>
                    </div>
                </div>

                <div className="col-span-full flex justify-end my-2">
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-gray-900 hover:bg-gray-700 text-white rounded-md transition-all duration-200 cursor-pointer"
                    >
                        Create Task
                    </button>
                </div>
            </div>
        </form >
    );
}
