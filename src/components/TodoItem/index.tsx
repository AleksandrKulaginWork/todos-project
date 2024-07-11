import React from "react";
import "./style.css";

interface TodoItemProps {
    text: string;
    id: number;
    completed: boolean;
    toggleCompletion: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({text, id, completed, toggleCompletion}) => {

    const handleChange = () => {
        toggleCompletion(id);
    }

    const checkboxId = `checkbox-${id}`;

    return (
        <li className="todo-item"
            style={{ 
                textDecoration: completed ? 'line-through' : 'none', 
                color: completed ? "grey" : "black"}}>
            
            <div>
                <input 
                    className="checkbox_input"
                    id={checkboxId}
                    type="checkbox"
                    checked={completed}
                    onChange={handleChange}
                /> 
                <label 
                    className="checkbox_label"
                    htmlFor={checkboxId}>
                </label>
            </div>

            <span className="todo-text">{text}</span>
        </li>
    )
}

export default TodoItem