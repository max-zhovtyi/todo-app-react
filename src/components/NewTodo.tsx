import React from 'react';
import { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../assets/scss/NewTodo.scss';

const NewTodo: React.FC<{ onAddTodoItem: (text: string, date: Date) => void }> = (props) => {

  const todoInputRef = useRef<HTMLInputElement>(null);
  const [inputValid, setInputValid] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    // Reset validation error.
    setInputValid(true);

    const todoText = todoInputRef.current!.value;

    // Validation.
    if (todoText.trim().length < 3) {
      setInputValid(false);
      return;
    }

    props.onAddTodoItem(todoText, selectedDate);

    // Empty input after adding todo.
    todoInputRef.current!.value = '';
  };

  return (
    <form className="create-form" onSubmit={submitHandler}>

      <div className="input-wrapper">
        <input type="text" placeholder="What's on your plan?" className="todo-input" ref={todoInputRef} />
        {!inputValid &&
          <p className="error">Task need minimum 3 letters.</p>
        }
      </div>

      <DatePicker
        showIcon
        dateFormat="dd.MM.yyyy"
        toggleCalendarOnIconClick
        selected={selectedDate}
        onChange={(date: any) => setSelectedDate(date)}
      />

      <button className="btn">Add</button>  
                
    </form>
  );
}

export default NewTodo;