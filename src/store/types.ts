export interface RootState {
  todos: ToDo[];
}

export interface ToDo {
  done: boolean;
  text: string;
}
