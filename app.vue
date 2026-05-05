<script setup lang="ts">
type Todo = {
  id: number
  title: string
  done: boolean
}

const todos = ref<Todo[]>([
  { id: 1, title: 'Wire repo to ZStack', done: true },
  { id: 2, title: 'Provision a Fly deployment', done: false },
  { id: 3, title: 'Trigger deploys from GitHub pushes', done: false }
])
const draft = ref('')

const openCount = computed(() => todos.value.filter((todo) => !todo.done).length)

function addTodo(): void {
  const title = draft.value.trim()
  if (!title) return
  todos.value.unshift({ id: Date.now(), title, done: false })
  draft.value = ''
}

function removeTodo(id: number): void {
  todos.value = todos.value.filter((todo) => todo.id !== id)
}
</script>

<template>
  <main class="page">
    <section class="shell">
      <header class="header">
        <div>
          <p class="eyebrow">ZStack demo workspace</p>
          <h1>Todo</h1>
        </div>
        <div class="counter">{{ openCount }} open</div>
      </header>

      <form class="composer" @submit.prevent="addTodo">
        <input v-model="draft" placeholder="Add a task" autofocus>
        <button type="submit">Add</button>
      </form>

      <ul class="list">
        <li v-for="todo in todos" :key="todo.id">
          <label>
            <input v-model="todo.done" type="checkbox">
            <span :class="{ done: todo.done }">{{ todo.title }}</span>
          </label>
          <button type="button" @click="removeTodo(todo.id)">Remove</button>
        </li>
      </ul>
    </section>
  </main>
</template>

<style>
:root {
  color-scheme: dark;
  background: #071017;
  color: #e5edf5;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

body {
  margin: 0;
}

.page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px;
  background:
    radial-gradient(circle at 20% 12%, rgba(56, 189, 248, 0.18), transparent 28%),
    linear-gradient(135deg, #071017 0%, #0d1821 45%, #0a1020 100%);
}

.shell {
  width: min(720px, 100%);
  border: 1px solid #203244;
  border-radius: 8px;
  background: rgba(11, 18, 26, 0.88);
  box-shadow: 0 24px 90px rgba(0, 0, 0, 0.35);
  padding: 24px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.eyebrow {
  color: #38bdf8;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 4px;
}

h1 {
  font-size: 42px;
  margin: 0;
}

.counter {
  border: 1px solid #24445c;
  border-radius: 999px;
  padding: 6px 10px;
  color: #93c5fd;
  font-size: 14px;
}

.composer {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  margin-bottom: 18px;
}

input,
button {
  border: 1px solid #263747;
  border-radius: 6px;
  background: #071017;
  color: inherit;
  padding: 10px 12px;
  font: inherit;
}

button {
  cursor: pointer;
  background: #2563eb;
  border-color: #2563eb;
}

.list {
  display: grid;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border: 1px solid #1f2f3f;
  border-radius: 6px;
  background: #09131b;
  padding: 10px 12px;
}

label {
  display: flex;
  align-items: center;
  gap: 10px;
}

li button {
  background: transparent;
  border-color: #334155;
  color: #94a3b8;
}

.done {
  color: #64748b;
  text-decoration: line-through;
}
</style>
