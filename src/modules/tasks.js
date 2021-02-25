function createTask (title, description, dueDate, priority, checked, notes, project) {
    return { title, description, dueDate, priority, checked, notes, project };
};

export default createTask;