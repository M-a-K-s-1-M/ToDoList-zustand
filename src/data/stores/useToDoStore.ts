import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { generateId } from '../helpers';

interface ITask {
    id: string,
    title: string,
}

interface IToDoStore {
    tasks: ITask[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
}

export const useToDoStore = create(
    persist(
        devtools((set) => ({
            tasks: [
                {
                    id: generateId(),
                    title: 'Тестовая 1'
                },
                {
                    id: generateId(),
                    title: 'Тестовая 2'
                }
            ],
            createTask: (title: string) => set((state: IToDoStore) => ({
                tasks: [...state.tasks, { id: generateId(), title }]
            })),
            updateTask: (id: string, title: string) => {
                set((state: IToDoStore) => ({
                    tasks: state.tasks.map((task: ITask) => ({
                        ...task,
                        title: task.id === id ? title : task.title
                    }))
                }))
            },
            removeTask: (id: string) => {
                set((state: IToDoStore) => ({
                    tasks: state.tasks.filter((task: ITask) => task.id !== id)
                }))
            }
        })),
        {
            name: 'toDoList', // имя для localStorage
            storage: createJSONStorage(() => localStorage), // использование localStorage для хранения
        }
    )
)
