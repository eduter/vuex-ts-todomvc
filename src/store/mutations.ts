import { RootState, ToDo } from "@/store/types";

// for testing
if (navigator.userAgent.indexOf("PhantomJS") > -1) {
  window.localStorage.clear();
}

interface EditToDoPayload {
  todo: ToDo;
  text?: ToDo["text"];
  done?: ToDo["done"];
}

export type Mutations = typeof mutations;

const mutations = {
  addTodo(state: RootState, todo: ToDo) {
    state.todos.push(todo);
  },

  removeTodo(state: RootState, todo: ToDo) {
    state.todos.splice(state.todos.indexOf(todo), 1);
  },

  editTodo(
    state: RootState,
    { todo, text = todo.text, done = todo.done }: EditToDoPayload
  ) {
    todo.text = text;
    todo.done = done;
  }
};

export default mutations;
