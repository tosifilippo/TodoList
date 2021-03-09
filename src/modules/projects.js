function createProject (title, description, dueDate, tasks = []) {
  return {
    title, description, dueDate, tasks
  }
}

export default createProject
