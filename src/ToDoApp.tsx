import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { Task } from './models/Task'

const LOCAL_STORAGE_KEY = 'todo-app-tasks'

function ToDoApp() {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const localTasks = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (localTasks) {
            try {
                return JSON.parse(localTasks)
            } catch {
                return []
            }
        }
        return []
    })
    const [newTask, setNewTask] = useState<string>('')

    useEffect(() => {
        if (tasks.length === 0) {
            // Limit to just the first 10 items for the sake of brevity
            fetch('https://dummyjson.com/todos/random/10')
                .then((res) => res.json())
                .then((data) => setTasks(data))
        }
    }, [tasks.length])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks))
    }, [tasks])

    // Basic functions
    // Todo:
    // 1. Handle input from "Add task" field
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setNewTask(event.target.value)
    }

    // 5, Handle Enter key in input field
    function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') addTask()
    }

    // 2. Add new task
    function addTask() {
        // Check if input is field is empty so as to forbid adding empty tasks
        if (newTask.trim() !== '') {
            const newItem: Task = {
                id: Date.now(),
                todo: newTask.trim(),
                completed: false,
            }
            setTasks((prev) => [newItem, ...prev])
            setNewTask('')
        }
    }

    // 3. Complete task
    function completeTask(id: number) {
        setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
    }

    // 4. Delete task
    function deleteTask(id: number) {
        const updatedTasks = tasks.filter((task) => task.id !== id)
        setTasks(updatedTasks)
    }

    return (
        <div className="to-do-app">
            <h1>Westpac ToDo App</h1>

            <div className="new-task-input">
                <input type="text" placeholder="Enter new task..." value={newTask} onChange={handleInputChange} onKeyDown={handleKeyPress} />
                <button className="add-button" onClick={addTask}>
                    Add
                </button>
            </div>

            <ul>
                {tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <span className={`text${task.completed ? ' completed' : ''}`}>{task.todo}</span>
                            <button className="complete-button" onClick={() => completeTask(task.id)}>
                                ✅
                            </button>
                            <button className="delete-button" onClick={() => deleteTask(task.id)}>
                                ❌
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ToDoApp
