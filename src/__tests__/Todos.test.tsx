import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todos from '../components/Todos';

describe('Todos Component', () => {
    it('adds a new task', async () => {
    render(<Todos />);
    const input = screen.getByPlaceholderText(/What needs to be done?/i);
    userEvent.type(input, 'New Task{enter}');

    await waitFor(() => {
        const newTask = screen.getByText(/New Task/i);
        expect(newTask).toBeInTheDocument();
        expect(newTask.closest('li')).toBeInTheDocument();
    });
});
});