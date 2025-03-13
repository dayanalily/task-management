import { useTaskStore } from "../store/taskStore";
import { useMemo } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { motion, AnimatePresence } from "framer-motion";
import TaskItem from "./TaskItem";

export default function TaskTable() {
    const tasks = useTaskStore((state) => state.tasks);
    
    const columns = useMemo(() => ({
        "In Progress": tasks.filter((task) => !task.completed),
        "Done": tasks.filter((task) => task.completed),
    }), [tasks]);



    return (
        <div className="container max-w-6xl mx-auto py-8">
            <DndContext collisionDetection={closestCenter} >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(Object.keys(columns) as Array<"In Progress" | "Done">).map((status) => (
                        <div 
                            key={status} 
                            id={status}
                            className="bg-white rounded-lg shadow-lg p-6 pt-5 border border-gray-200"
                        >
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                {status}
                                <span className="ml-2 text-sm font-normal text-gray-500">
                                    ({columns[status].length})
                                </span>
                            </h2>
                            <SortableContext 
                                items={columns[status].map(task => task.id.toString())} 
                                strategy={verticalListSortingStrategy}
                            >
                                <div className="space-y-3">
                                    <AnimatePresence>
                                        {columns[status].map((task) => (
                                            <motion.div
                                                key={task.id}
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <TaskItem task={task} />
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </SortableContext>
                        </div>
                    ))}
                </div>
            </DndContext>
        </div>
    );
}