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
        <li v-for="(val, key) in filters">
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

<script>
import Vue from "vue";
import Component from "vue-class-component";
import { mapActions } from "vuex";
import TodoItem from "./TodoItem.vue";

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
};

@Component({
  components: { TodoItem },
  methods: {
    ...mapActions(["toggleAll", "clearCompleted"]),
  },
  filters: {
    pluralize: (n, w) => (n === 1 ? w : w + "s"),
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  }
})
export default class App extends Vue {

  visibility = "all";

  get filteredTodos() {
    return filters[this.visibility](this.todos);
  }

  get todos() {
    return this.$store.state.todos;
  }

  get allChecked() {
    return this.todos.every(todo => todo.done);
  }

  get remaining() {
    return this.todos.filter(todo => !todo.done).length;
  }

  addTodo(e) {
    const text = e.target.value;
    if (text.trim()) {
      this.$store.dispatch("addTodo", text);
    }
    e.target.value = "";
  }

}

</script>