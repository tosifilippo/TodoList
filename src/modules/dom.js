import createProject from "./projects";

let taskArray = [];
let projectArray = [];

const showProjectFormButton = document.getElementById("show-project-form");
const addProjectForm = document.getElementById("add-project-form");

showProjectFormButton.addEventListener("click", function showProjectForm() {
    addProjectForm.hidden = false;
});

const addProjectButton = document.getElementById("add-project");
addProjectButton.addEventListener("click", function addProject() {
    const projectTitle = document.getElementById("project-title");
    const projectDueDate = document.getElementById("project-due-date");
    if (projectTitle.value != "" && projectDueDate.value != "") {
    let newProject = createProject(projectTitle.value, projectDueDate.value);
    projectArray.push(newProject);
    addProjectForm.hidden = true;
    console.log(projectArray);
    };
});