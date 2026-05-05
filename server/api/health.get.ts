export default defineEventHandler(() => {
  return {
    ok: true,
    service: 'zstack-todo-demo',
    ts: new Date().toISOString()
  }
})
