import IconClose from './icons/IconClose';
import '../assets/scss/DeleteDialog.scss';

const DeleteDialog: React.FC<{
  todo: string,
  show: boolean,
  onClose: () => void,
  onDeleteTodo: () => void,
}> = (props) => {
  return (
    <div className={`dialog-modal delete-todo-dialog ${props.show ? 'opened' : ''}`}>
      <div className="dialog-bg" onClick={props.onClose}></div>
      <div className="dialog-window">

        <div className='btn-close-dialog' onClick={props.onClose}>
          <IconClose />
          Close
        </div>

        <div className='modal-body'>
          <div className='modal-heading'>Are you sure?</div>

          <div className='text'>
            Are you sure you want to delete task "{props.todo}"?
          </div>

          <div className='action-btn-wrapper'>
            <button className='btn btn-cancel' onClick={props.onClose}>Cancel</button>
            <button className='btn btn-delete' onClick={props.onDeleteTodo}>Delete</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default DeleteDialog;
