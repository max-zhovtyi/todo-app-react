import React from 'react';
import { useState } from 'react';
import { delay } from './helpers/helper-functions';
import { Filter, Sorting, CompareFunc } from './helpers/types';

// Import components.
import TodoList from './components/TodoList';
import Todo from './models/todo';
import NewTodo from './components/NewTodo';
import Controls from './components/Controls';
import DeleteDialog from './components/DeleteDialog';
import Filters from './components/Filters';

// Import styles.
import './assets/scss/App.scss';

function App() {

  const [todoList, setTodoList] = useState<Todo[]>([
    new Todo('Eat', new Date().toISOString()),
    new Todo('Drink', new Date().toISOString()),
    new Todo('Sleep', new Date().toISOString(), true),
    new Todo('Repeat', new Date().toISOString()),
  ]);
  const [filter, setFilter] = useState<Filter>('');
  const [sorting, setSorting] = useState<Sorting>('');
  const [previousTodos, setPreviousTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [forceApicallError, setForceApicallError] = useState(false);
  const [apicallError, setApicallError] = useState(false);
  // Delete dialog state.
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [todoToRemove, setTodoToRemove] = useState<Todo | null>(null);

  // Initialise todo tasks from the localStorage.
  React.useEffect(() => {
    let todos = localStorage.getItem('todo-app.todos');

    if (todos !== null) {
      const todosParsed: Todo[] = JSON.parse(todos);

      setTodoList(todosParsed);
    }
  }, []);

  // Update todos in localStorage.
  React.useEffect(() => {
    localStorage.setItem('todo-app.todos', JSON.stringify(todoList));
  }, [todoList]);

  const addTodoHandler = (text: string, date: Date) => {
    const newTodo = new Todo(text, date.toISOString());

    setTodoList((prev) => {
      return prev.concat(newTodo);
    });
  }

  const completeTodoHandler = (id: string) => {
    setTodoList((prev) => {
      let todos = prev.map((item) => {
        if (item.id === id) {
          // Return new object as we should never change "prev" state.
          return new Todo(item.text, item.date, !item.completed);
        }

        return item;
      });

      return todos;
    });
  }

  const getTodos = () => {
    if (filter !== '') return getFilteredItems();
    if (sorting !== '') return getSortingItems();

    return todoList;
  }

  /*
   * Filter functions.
   */
  const onFilterTodos = (filter: Filter) => {
    // Reset sorting.
    setSorting('');

    setFilter(filter);
  }

  const getFilteredItems = () => {
    let items: Todo[] = [];

    switch (filter) {
      case 'all':
        items = todoList;
        break;
      case 'completed':
        items = todoList.filter((item) => {
          return item.completed === true;
        });
        break;
      case 'open':
        items = todoList.filter((item) => {
          return item.completed === false;
        });
        break;
    }

    return items;
  }

  /*
   * Sorting functions.
   */
  const onSortByDate = () => {

    // Reset filter.
    setFilter('');

    switch (sorting) {
      case '':
        setSorting('asc');
        break;
      case 'asc':
        setSorting('desc');
        break;
      case 'desc':
        setSorting('asc');
        break;
    }
  }

  const sortAsc = (a: Todo, b: Todo) => {
    const dateA = a.date;
    const dateB = b.date;

    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }

    return 0;
  }

  const sortDesc = (a: Todo, b: Todo) => {
    const dateA = a.date;
    const dateB = b.date;

    if (dateA > dateB) {
      return -1;
    }
    if (dateA < dateB) {
      return 1;
    }

    return 0;
  }

  const getSortingItems = () => {
    let items: Todo[] = [];

    let sortingFunction: CompareFunc;

    switch (sorting) {
      case 'asc':
        sortingFunction = sortAsc;
        break;
      case 'desc':
        sortingFunction = sortDesc;
        break;
      default:
        sortingFunction = sortAsc;
        break;
    }

    // Deep copy todos array so we can change it. Sort function mutates the array, so we cant use it on todoList.
    items = JSON.parse(JSON.stringify(todoList));

    items.sort(sortingFunction);

    return items;
  }

  /*
   * Delete todo functions.
   */
  const showDeleteDialogHandler = (id: string) => {
    // Show dialog.
    setShowDeleteDialog(true);

    // Find a todo, which we intend to remove and save it to state.
    const todo = todoList.find((item) => {
      return item.id === id;
    });
    if (todo) {
      setTodoToRemove(todo);
    }
  }

  const deleteTodoHandler = () => {
    setTodoList((prev) => {
      return prev.filter((todo) => {
        return todo.id !== todoToRemove!.id;
      });
    });

    closeDialogHandler();
  }

  const closeDialogHandler = () => {
    setShowDeleteDialog(false);
  }

  /*
   * Load previous tasks functions.
   */
  const onFetchTodos = async () => {

    // Reset errors.
    setApicallError(false);
    
    // Remove all previously loaded todos from the app.
    setPreviousTodos([]);

    try {
      setLoading(true);

      if (forceApicallError) {

        // Add delay so "loading" state is more obvious. Just for visualisation purposes of this test.
        await delay(1200);

        throw new Error('Load previous tasks failed.');
      } else {
        console.log('Loading previous tasks...');

        const url = "https://my-json-server.typicode.com/typicode/demo/posts";
        const response = await fetch(url);
        const data = await response.json();

        // Add delay so "loading" state is more obvious. Just for visualisation purposes of this test.
        await delay(1200);

        setLoading(false);

        const previousTodos = data.map((item: any) => {
          return new Todo(item.title, '', true);
        });

        setPreviousTodos(previousTodos);
      }
    } catch (error: any) {
      console.error(error.message);

      setApicallError(true);
      setLoading(false);
    }
  }

  const tooglePrevTodosError = () => {
    // Make "Load previous todos" api call to fail.
    setForceApicallError(!forceApicallError);
  }

  return (
    <div>
      <div className='main'>
        <h1 className='heading'>Today's Tasks</h1>

        <NewTodo onAddTodoItem={addTodoHandler} />

        <Filters filter={filter} sorting={sorting} onFilterTodos={onFilterTodos} onSortByDate={onSortByDate} />

        <TodoList items={getTodos()} onDeleteTodo={showDeleteDialogHandler} onToogleState={completeTodoHandler} />

        {apicallError &&
          <div className='error-message'>Ups! Tasks could not be loaded.</div>
        }

        <button className="btn btn-fetch-todos" onClick={onFetchTodos} disabled={loading} >
          {loading ? 'Loading tasks…' : 'Load previous tasks'}
        </button>

        <div className="previous-todos">
          {previousTodos.length > 0 &&
            <TodoList items={previousTodos} onDeleteTodo={() => { }} onToogleState={() => { }} disableDelete />
          }
        </div>
      </div>

      <Controls forceApicallError={forceApicallError} onToogleState={tooglePrevTodosError} />

      <DeleteDialog
        show={showDeleteDialog}
        todo={todoToRemove ? todoToRemove.text : ''}
        onClose={closeDialogHandler}
        onDeleteTodo={deleteTodoHandler}
      />
    </div>
  );
}

export default App;
