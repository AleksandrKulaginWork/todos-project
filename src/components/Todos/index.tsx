import { useState, useEffect } from "react";
import { ChangeEvent, KeyboardEvent } from 'react';
import TodoItem from "../TodoItem";
import "./style.css";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}


const Todos = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [todos, setTodos] = useState<Todo[]>(() => {
        const storedTodos = localStorage.getItem('todos');
        return storedTodos ? JSON.parse(storedTodos) : [];
    });
    const [filter, setFilter] = useState<"All" | "Active" | "Completed">("All");

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputValue.trim() !== '') {
            const newTodo: Todo = {
                id: todos.length + 1,
                text: inputValue.trim(),
                completed: false
            };
            setTodos([newTodo, ...todos]);
            setInputValue('');
        }
    }

    const handleFilterChange = (selectedFilter: "All" | "Active" | "Completed") => {
        setFilter(selectedFilter);
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === "All") {
            return true;
        } else if (filter === "Active") {
            return !todo.completed; 
        } else if (filter === "Completed") {
            return todo.completed; 
        }
        return true;
    });

    const toggleTodoCompletion = (id: number) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ))};

    const clearTodos = () => {
        setTodos([]);
    };

    const activeCount = todos.filter(todo => !todo.completed).length;

    return (
        <div className="todos">
            <input className="todos-input"
            type="text" 
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="What needs to be done?"/>

            <ul>
                {filteredTodos.map((todo) => (
                    <TodoItem 
                        key={todo.id} 
                        text={todo.text} 
                        id={todo.id}
                        completed={todo.completed}
                        toggleCompletion={toggleTodoCompletion}/>
                ))}
            </ul>

            {todos.length > 0 && (
                <div className="todos-button">
                    <button className="todos-active"> {activeCount} {activeCount === 1 ? 'item' : 'items'} left</button>
                    <div className="fillter-buttons">
                        <button onClick={() => handleFilterChange('All')}>All</button>
                        <button onClick={() => handleFilterChange('Active')}>Active</button>
                        <button onClick={() => handleFilterChange('Completed')}>Completed</button>
                    </div>
                    <button className="todos-delete" onClick={clearTodos}>Clear completed</button>
                </div>
            )}
        </div>
    )
}

export default Todos