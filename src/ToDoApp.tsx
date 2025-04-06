import { ChangeEvent, useEffect, useState } from 'react'
import { Task } from './models/Task'

const mockData = [
    { id: 1, todo: 'Implement fetching from DummyJSON', completed: true },
    { id: 2, todo: 'Implement adding new items', completed: true },
    { id: 3, todo: 'Implement completing items', completed: true },
]

function ToDoApp() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTask, setNewTask] = useState<string>('')

    useEffect(() => {
        if (tasks.length === 0) {
            // Limit to just the first 10 items for the sake of brevity
            fetch('https://dummyjson.com/todos?limit=10')
                .then((res) => res.json())
                .then((data) => setTasks(data.todos))
        }
    }, [tasks.length])

    // Basic functions
    // Todo:
    // 1. Handle input from "Add task" field
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setNewTask(event.target.value)
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
        }
    }

    // 3. Complete task
    function completeTask(id: number) {
        setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
    }

    return (
        <>
            <div className="to-do-app">
                <h1>Westpac ToDo App</h1>

                <div>
                    <input type="text" placeholder="Enter new task..." value={newTask} onChange={handleInputChange} />
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
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default ToDoApp
