import createProject from "./projects";

let taskArray = [];
let projectsArray = [];

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
    projectsArray.push(newProject);
    saveLocal();
    addProjectForm.hidden = true;
    };
});

function saveLocal() {
    localStorage.setItem("projectsArray", JSON.stringify(projectsArray));
};