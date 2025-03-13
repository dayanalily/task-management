import { useEffect, useState } from "react";
import AddTaskForm from "../components/AddTaskForm";
import TaskTable from "../components/TaskTable";
import { useTaskStore } from "../store/taskStore";
import {PlusIcon, XMarkIcon} from '@heroicons/react/24/outline'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

export default function Index() {
    const fetchTasks = useTaskStore((state) => state.fetchTasks);
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return (
        <div className="mx-auto p-4 bg-gray-50 h-screen">
            <div className="max-w-6xl container mx-auto sm:flex sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1">
                    <h1 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Task Manager
                    </h1>
                </div>
                <div className="mt-5 flex sm:mt-0 sm:ml-4">
                    <span className="sm:ml-3">
                        <button
                            type="button"
                            onClick={() => setIsFormOpen(true)}
                            className="inline-flex items-center rounded-md bg-gray-900 hover:bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700 transition-all duration-200"
                        >
                            <PlusIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />
                            Create New Task
                        </button>
                    </span>
                </div>
            </div>

            <Dialog
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                className="relative z-50"
            > <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex justify-center p-4 text-center sm:items-center ">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in w-full md:max-w-xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div className="bg-white px-6 pt-4 pb-4 sm:pt-4 sm:pb-4">
                                <button onClick={() => setIsFormOpen(false)} className="absolute right-5 top-4 text-gray-500 hover:text-gray-700 cursor-pointer">
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                                <DialogTitle as="h2" className="font-semibold text-gray-900 mb-3">
                                    Create New Task
                                </DialogTitle>
                                <AddTaskForm onClose={() => setIsFormOpen(false)} />
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
            <TaskTable />
        </div>

    );
}
