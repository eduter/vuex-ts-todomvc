import { RootState } from "./types";

export type Getters = typeof getters;

const getters = {
  allTodos: (state: RootState) => state.todos,
  activeTodos: (state: RootState) => state.todos.filter(todo => !todo.done),
  completedTodos: (state: RootState) => state.todos.filter(todo => todo.done)
};

export default getters;
