import React, { ChangeEvent, useState } from 'react'
import { Task } from './models/Task'

function ToDoApp() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTask, setNewTask] = useState<string>('')
    // Basic functions
    // Todo:
    // 1. Handle input from "Add task" field
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {}

    // 2. Add new task
    function addTask() {}

    // 3. Complete task
    function completeTask(id: number) {}

    return (
        <>
            <div className="to-do-app">
                <h1>Westpac ToDo App</h1>
            </div>
        </>
    )
}

export default ToDoApp
