import Todo from '../models/todo';
import IconCheckmark from './icons/IconCheckmark';
import IconDelete from './icons/IconDelete';
import '../assets/scss/TodoItem.scss';

const TodoItem: React.FC<{
  item: Todo,
  disableDelete?: boolean,
  onDeleteTodo: () => void,
  onToogleState: () => void
}> = (props) => {

  let date = '';
  if (props.item.date !== '') {
    const todoDate = new Date(props.item.date);
    date = new Intl.DateTimeFormat('uk-UA').format(todoDate);
  }

  return (
    <li className="item">
      <div className={`checkbox-item ${props.item.completed ? 'checked' : ''}`} onClick={props.onToogleState}>
        <div className="inner">
          <div className="checkbox">
            <IconCheckmark />
          </div>
          <div className="checkbox-label">{props.item.text}</div>
        </div>
      </div>

      <div className='right-col'>
        <div className='date'>{date}</div>

        {!props.disableDelete &&
          <div className='btn-delete' onClick={props.onDeleteTodo}>
            <IconDelete />
          </div>
        }
      </div>
    </li>
  );
}

export default TodoItem;