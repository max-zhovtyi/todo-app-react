import IconCheckmark from './icons/IconCheckmark';
import '../assets/scss/Controls.scss';

const Controls: React.FC<{ forceApicallError: boolean, onToogleState: () => void }> = (props) => {
  return (
    <div className='controls'>
      <h1 className='heading'>Controls</h1>

      <div className={`checkbox-item ${props.forceApicallError ? 'checked' : ''}`} onClick={props.onToogleState}>
        <div className="inner">
          <div className="checkbox">
            <IconCheckmark />
          </div>
          <div className="checkbox-label">Get error when calling "Load previous tasks".</div>
        </div>
      </div>

    </div>
  );
}

export default Controls;