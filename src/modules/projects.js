function createProject (title, description, dueDate, tasks ) {
    tasks = [];
    return { title, description, dueDate, tasks };
};

export default createProject;