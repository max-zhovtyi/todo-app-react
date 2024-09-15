import Todo from '../models/todo';
import TodoItem from './TodoItem';
import '../assets/scss/TodoList.scss';

const Todos: React.FC<{ 
  items: Todo[],
  disableDelete?: boolean,
  onDeleteTodo: (id: string) => void,
  onToogleState: (id: string) => void
  }> = (props) => {
  return (
    <ul className="todos">
      {props.items.map(item => {
        return (
          <TodoItem
            key={item.id}
            item={item}
            disableDelete={props.disableDelete}
            onDeleteTodo={props.onDeleteTodo.bind(null, item.id)}
            onToogleState={props.onToogleState.bind(null, item.id)}
          />
        );
      })}
    </ul>
  );
}

export default Todos;
