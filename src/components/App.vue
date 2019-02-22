<style src="todomvc-app-css/index.css"></style>

<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        autocomplete="off"
        placeholder="What needs to be done?"
        @keyup.enter="addTodo"
      />
    </header>
    <!-- main section -->
    <section class="main" v-show="todos.length">
      <input
        class="toggle-all"
        id="toggle-all"
        type="checkbox"
        :checked="allChecked"
        @change="toggleAll(!allChecked)"
      />
      <label for="toggle-all"></label>
      <ul class="todo-list">
        <TodoItem
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
        />
      </ul>
    </section>
    <!-- footer -->
    <footer class="footer" v-show="todos.length">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize("item") }} left
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters" :key="key">
          <a
            :href="'#/' + key"
            :class="{ selected: visibility === key }"
            @click="visibility = key"
            >{{ key | capitalize }}</a
          >
        </li>
      </ul>
      <button
        class="clear-completed"
        v-show="todos.length > remaining"
        @click="clearCompleted"
      >
        Clear completed
      </button>
    </footer>
  </section>
</template>

<script lang="ts">
import Component from "vue-class-component";
import TodoItem from "./TodoItem.vue";
import { RootState, ToDo } from "@/store/types";
import { Actions } from "@/store/actions";
import { mapAction, Vue } from "@/utils/vuex";

@Component({
  components: { TodoItem },
  filters: {
    pluralize: (n: number, w: string) => (n === 1 ? w : w + "s"),
    capitalize: (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
  }
})
export default class App extends Vue<RootState, Actions> {
  visibility = "all";
  filters = App.filters;

  addTodoAction = mapAction<App, Actions, "addTodo">(this, "addTodo");
  toggleAll = mapAction<App, Actions, "toggleAll">(this, "toggleAll");
  clearCompleted = mapAction<App, Actions, "clearCompleted">(this, "clearCompleted");

  static filters: { [key: string]: (todos: ToDo[]) => ToDo[] } = {
    all: (todos: ToDo[]) => todos,
    active: (todos: ToDo[]) => todos.filter(todo => !todo.done),
    completed: (todos: ToDo[]) => todos.filter(todo => todo.done)
  };

  get filteredTodos(): ToDo[] {
    return this.filters[this.visibility](this.todos);
  }

  get todos(): ToDo[] {
    return this.$store.state.todos;
  }

  get allChecked(): boolean {
    return this.todos.every(todo => todo.done);
  }

  get remaining(): number {
    return this.todos.filter(todo => !todo.done).length;
  }

  addTodo(e: any): void {
    const text = e.target.value;
    if (text.trim()) {
      this.addTodoAction(text);
    }
    e.target.value = "";
  }
}
</script>
