import Todo from '../models/todo';

export type CompareFunc = (a: Todo, b: Todo) => number;
export type Filter = '' | 'all' | 'completed' | 'open';
export type Sorting = '' | 'asc' | 'desc';