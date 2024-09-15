import { Filter, Sorting } from '../helpers/types';
import IconArrow from './icons/IconArrow';
import '../assets/scss/Filters.scss';

const Filters: React.FC<{
  filter: Filter,
  sorting: Sorting,
  onFilterTodos: (filter: Filter) => void,
  onSortByDate: () => void
}> = (props) => {
  return (
    <div className='filters-wrapper'>
      <div className='filters'>
        <div className={`filter-item ${props.filter === 'all' ? 'active' : ''}`} onClick={props.onFilterTodos.bind(null, 'all')}>ALL</div>
        <div className={`filter-item ${props.filter === 'completed' ? 'active' : ''}`} onClick={props.onFilterTodos.bind(null, 'completed')}>DONE</div>
        <div className={`filter-item ${props.filter === 'open' ? 'active' : ''}`} onClick={props.onFilterTodos.bind(null, 'open')}>OPEN</div>
      </div>

      <div className={`filter-item sorting-by-date ${props.sorting}`} onClick={props.onSortByDate}>
        <IconArrow />
        DD.MM.YY
      </div>
    </div>
  );
}

export default Filters;
