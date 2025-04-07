import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import ToDoApp from './ToDoApp'

describe('ToDoList', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: async () => [{ id: 1, todo: 'Test task', completed: false }],
        } as Response)
    })

    afterEach(() => {
        jest.restoreAllMocks()
        window.localStorage.clear()
    })

    test('pulls  and renders initial tasks from the API', async () => {
        render(<ToDoApp />)

        expect(await screen.findByText('Test task')).toBeInTheDocument()
    })

    test('adds new task to the list', async () => {
        render(<ToDoApp />)

        const input = screen.getByPlaceholderText('Enter new task...')
        fireEvent.change(input, { target: { value: 'New Test Task' } })

        const addButton = screen.getByText('Add')
        fireEvent.click(addButton)

        expect(await screen.findByText('New Test Task')).toBeInTheDocument()
    })

    test('deletes a task', async () => {
        render(<ToDoApp />)

        const deleteButton = (await screen.findByText('❌')) as HTMLButtonElement
        fireEvent.click(deleteButton)

        await waitFor(() => {
            const taskText = screen.queryByText('Test task')
            expect(taskText).not.toBeInTheDocument()
        })
    })

    test('marks a task as completed', async () => {
        render(<ToDoApp />)

        const completeButton = (await screen.findByText('✅')) as HTMLButtonElement
        fireEvent.click(completeButton)

        await waitFor(() => {
            const taskText = screen.getByText('Test task')
            expect(taskText).toHaveClass('completed')
        })
    })
})
