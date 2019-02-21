import { ActionContext } from "vuex";
import { RootState, ToDo } from "@/store/types";

export default {
  addTodo(context: ActionContext<RootState, RootState>, text: string) {
    context.commit("addTodo", {
      text,
      done: false
    });
  },

  removeTodo(context: ActionContext<RootState, RootState>, todo: ToDo) {
    context.commit("removeTodo", todo);
  },

  toggleTodo(context: ActionContext<RootState, RootState>, todo: ToDo) {
    context.commit("editTodo", { todo, done: !todo.done });
  },

  editTodo(
    context: ActionContext<RootState, RootState>,
    payload: { todo: ToDo; text: ToDo["text"] }
  ) {
    context.commit("editTodo", payload);
  },

  toggleAll(context: ActionContext<RootState, RootState>, done: boolean) {
    context.state.todos.forEach((todo: ToDo) => {
      context.commit("editTodo", { todo, done });
    });
  },

  clearCompleted(context: ActionContext<RootState, RootState>) {
    context.state.todos
      .filter(todo => todo.done)
      .forEach(todo => {
        context.commit("removeTodo", todo);
      });
  }
};
