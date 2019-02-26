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
        <li v-for="filter in ToDoFilters" :key="filter">
          <a
            :href="'#/' + filter"
            :class="{ selected: visibility === filter }"
            @click="visibility = filter"
          >
            {{ filter }}
          </a>
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
import { ToDo } from "@/store/types";
import { BaseComponent, mapAction } from "@/utils/BaseComponent";
import Component from "vue-class-component";
import TodoItem from "./TodoItem.vue";

enum ToDoFilters {
  ALL = "All",
  ACTIVE = "Active",
  COMPLETED = "Completed"
}

@Component({
  components: { TodoItem },
  filters: {
    pluralize: (n: number, w: string) => (n === 1 ? w : w + "s")
  }
})
export default class App extends BaseComponent {
  ToDoFilters = ToDoFilters;
  visibility = ToDoFilters.ALL;

  addTodoAction = mapAction<"addTodo">(this, "addTodo");
  toggleAll = mapAction<"toggleAll">(this, "toggleAll");
  clearCompleted = mapAction<"clearCompleted">(this, "clearCompleted");

  get filteredTodos(): ToDo[] {
    switch (this.visibility) {
      case ToDoFilters.ALL:
        return this.$store.getters.allTodos;
      case ToDoFilters.ACTIVE:
        return this.$store.getters.activeTodos;
      case ToDoFilters.COMPLETED:
        return this.$store.getters.completedTodos;
      default:
        throw Error(`Unknown visibility "${this.visibility}"`);
    }
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
