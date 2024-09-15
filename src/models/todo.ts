import { makeId } from '../helpers/helper-functions';

class Todo {
  id: string;
  text: string;
  date: string;
  completed: boolean;

  constructor(todoText: string, date: string, completed = false) {    
    this.id = makeId(10);
    this.text = todoText;
    this.date = date;
    this.completed = completed;
  }
}

export default Todo;