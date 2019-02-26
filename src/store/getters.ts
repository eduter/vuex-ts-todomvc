import { GetterTypes } from "@/utils/vuex";
import { RootState } from "./types";

export type Getters = GetterTypes<typeof getters>;

const getters = {
  allTodos: (state: RootState) => state.todos,
  activeTodos: (state: RootState) => state.todos.filter(todo => !todo.done),
  completedTodos: (state: RootState) => state.todos.filter(todo => todo.done)
};

export default getters;
