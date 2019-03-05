import { RootState, ToDo } from "@/store/types";
import { Context as GenericContext } from "@/utils/vuex";
import { Mutations } from "@/store/mutations";

type Context = GenericContext<RootState, Mutations>;

export type Actions = typeof actions;

const actions = {
  addTodo(context: Context, text: string) {
    context.commit("addTodo", {
      text,
      done: false
    });
  },

  removeTodo(context: Context, todo: ToDo) {
    context.commit("removeTodo", todo);
  },

  toggleTodo(context: Context, todo: ToDo) {
    context.commit("editTodo", { todo, done: !todo.done });
  },

  editTodo(context: Context, payload: { todo: ToDo; text: ToDo["text"] }) {
    context.commit("editTodo", payload);
  },

  toggleAll(context: Context, done: boolean) {
    context.state.todos.forEach((todo: ToDo) => {
      context.commit("editTodo", { todo, done });
    });
  },

  clearCompleted(context: Context) {
    context.state.todos
      .filter(todo => todo.done)
      .forEach(todo => {
        context.commit("removeTodo", todo);
      });
  }
};

export default actions;
