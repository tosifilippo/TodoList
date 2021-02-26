import createProject from "./projects";
import createTask from './tasks';

let taskArray = [];
let projectsArray = [];

const showProjectFormButton = document.getElementById("show-project-form");
const addProjectForm = document.getElementById("add-project-form");
const addProjectButton = document.getElementById("add-project");
const projectTitle = document.getElementById("project-title");
const projectDescription = document.getElementById("project-description");
const projectDueDate = document.getElementById("project-due-date");
const projectsContainer = document.getElementById("projects-container");
const addTaskForm = document.getElementById("add-task-form");

showProjectFormButton.addEventListener("click", function showProjectForm() {
    addProjectForm.hidden = false;
    console.log(projectsArray);
});

addProjectButton.addEventListener("click", function addProject() {
    if (projectTitle.value != "" && projectDueDate.value != "") {
    let newProject = createProject(projectTitle.value, projectDescription.value, projectDueDate.value);
    projectsArray.push(newProject);
    saveLocal();
    console.log(projectsArray);
    addProjectForm.hidden = true;
    populatePage();
    };
});

function saveLocal() {
    localStorage.setItem("projectsArray", JSON.stringify(projectsArray));
};

function restoreLocal() {
    projectsArray = (JSON.parse(localStorage.getItem("projectsArray")));
    if (projectsArray === null) projectsArray = [];
};

function populatePage() {
    projectsContainer.innerHTML = "";
    projectsArray.forEach(element => {
        if (element != null) {
        let projectDisplay = document.createElement("div");
        let projectPara = document.createElement("p");
        let deleteProjectButton = document.createElement("button");
        projectPara.innerHTML = "Project: " + element.title + "<br>" + 
        "Description: " + element.description + "<br>" +
        "Due Date: " + element.dueDate;
        deleteProjectButton.innerText = "Delete Project";
        deleteProjectButton.setAttribute("data-index", projectsArray.indexOf(element));
        deleteProjectButton.addEventListener("click", function() {
            delete projectsArray[deleteProjectButton.dataset.index];
            saveLocal();
            projectsContainer.removeChild(projectDisplay);
        });
        let addTaskButton = document.createElement("button");
        addTaskButton.innerHTML = "Add Task";
        addTaskButton.addEventListener("click", function() {
            addTaskForm.hidden = false;
        });
        projectDisplay.append(projectPara, addTaskButton, deleteProjectButton);
        projectsContainer.appendChild(projectDisplay);
        };    
    });
};

restoreLocal();
populatePage();