import React, { ChangeEvent, useState } from 'react'
import { Task } from './models/Task'

function ToDoApp() {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, todo: 'Implement fetching from DummyJSON', completed: false },
        { id: 2, todo: 'Implement adding new items', completed: false },
        { id: 3, todo: 'Implement completing items', completed: false },
    ])
    const [newTask, setNewTask] = useState<string>('')

    console.log(tasks)
    // Basic functions
    // Todo:
    // 1. Handle input from "Add task" field
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setNewTask(event.target.value)
    }

    // 2. Add new task
    function addTask() {}

    // 3. Complete task
    function completeTask(id: number) {}

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
                                <span className="text">{task.todo}</span>
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
