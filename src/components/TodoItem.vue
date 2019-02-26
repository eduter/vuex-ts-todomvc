<template>
  <li class="todo" :class="{ completed: todo.done, editing: editing }">
    <div class="view">
      <input
        class="toggle"
        type="checkbox"
        :checked="todo.done"
        @change="toggleTodo(todo)"
      />
      <label v-text="todo.text" @dblclick="editing = true"></label>
      <button class="destroy" @click="removeTodo(todo)"></button>
    </div>
    <input
      class="edit"
      v-show="editing"
      v-focus="editing"
      :value="todo.text"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit"
    />
  </li>
</template>

<script lang="ts">
import { ToDo } from "@/store/types";
import { BaseComponent, mapAction } from "@/utils/BaseComponent";
import Component from "vue-class-component";

@Component({
  props: ["todo"],
  directives: {
    focus(el, { value }, { context }) {
      if (value) {
        // @ts-ignore
        context.$nextTick(() => {
          el.focus();
        });
      }
    }
  }
})
export default class TodoItem extends BaseComponent {
  editing = false;
  todo!: ToDo;

  editTodo = mapAction<"editTodo">(this, "editTodo");
  removeTodo = mapAction<"removeTodo">(this, "removeTodo");
  toggleTodo = mapAction<"toggleTodo">(this, "toggleTodo");

  doneEdit(e: any) {
    const text = e.target.value.trim();
    const { todo } = this;
    if (!text) {
      this.removeTodo(todo);
    } else if (this.editing) {
      this.editTodo({ todo, text });
      this.editing = false;
    }
  }

  cancelEdit(e: any) {
    e.target.value = this.todo.text;
    this.editing = false;
  }
}
</script>
