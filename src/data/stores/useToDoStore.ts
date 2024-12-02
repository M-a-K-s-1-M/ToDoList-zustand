import { create } from 'zustand'
import { generateId } from '../helpers'

interface ITask {
    id: string,
    title: string,
}

interface ToDoStore {
    tasks: ITask[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
}

export const useToDoStore = create<ToDoStore>((set) => ({
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

    createTask: (title) => set(state => ({ tasks: [...state.tasks, { id: generateId(), title, }] })),

    updateTask: (id, title) => {
        set((state) => ({
            tasks: state.tasks.map((task: ITask) => ({
                ...task,
                title: task.id === id ? title : task.title,
            }))
        }))
    },

    removeTask: (id) => {
        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id)
        }))
    }
}))