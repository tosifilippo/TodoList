import createProject from "./projects";
import createTask from './tasks';

let projectsArray = [];

const showProjectFormButton = document.getElementById("show-project-form");
const addProjectForm = document.getElementById("add-project-form");
const addProjectButton = document.getElementById("add-project");
const projectTitle = document.getElementById("project-title");
const projectDescription = document.getElementById("project-description");
const projectDueDate = document.getElementById("project-due-date");
const projectsContainer = document.getElementById("projects-container");
const addTaskForm = document.getElementById("add-task-form");
const createTaskButton = document.getElementById("add-task");
const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementById("task-description");
const taskDueDate = document.getElementById("task-due-date");
const taskPriority = document.getElementById("task-priority");
const taskNotes = document.getElementById("task-notes");

showProjectFormButton.addEventListener("click", function showProjectForm() {
    addProjectForm.hidden = false;
});

addProjectButton.addEventListener("click", function addProject() {
    if (projectTitle.value != "" && projectDescription.value != "" && projectDueDate.value != "") {
    let newProject = createProject(projectTitle.value, projectDescription.value, projectDueDate.value);
    projectsArray.push(newProject);
    saveLocal();
    addProjectForm.hidden = true;
    populatePage();
    };
});

createTaskButton.addEventListener("click", function addTask() {
    if (taskTitle.value != "" && taskDescription.value != "" && taskDueDate.value != "" && 
    taskPriority.value != "" && taskNotes.value != "") {
        let newTask = createTask(taskTitle.value, taskDescription.value, taskDueDate.value, taskPriority.value, taskNotes.value);
        projectsArray[createTaskButton.dataset.index].tasks.push(newTask);
        saveLocal();
        addTaskForm.hidden = true;
        populatePage();
        console.log(projectsArray);
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
    projectsArray.forEach(project => {
        if (project != null) {
        let projectDisplay = document.createElement("div");
        let projectPara = document.createElement("p");
        let deleteProjectButton = document.createElement("button");
        projectPara.innerHTML = "Project: " + project.title + "<br>" + 
        "Description: " + project.description + "<br>" +
        "Due Date: " + project.dueDate;
        deleteProjectButton.innerText = "Delete Project";
        deleteProjectButton.setAttribute("data-index", projectsArray.indexOf(project));
        deleteProjectButton.addEventListener("click", function() {
            delete projectsArray[deleteProjectButton.dataset.index];
            saveLocal();
            projectsContainer.removeChild(projectDisplay);
        });
        let showTaskFormButton = document.createElement("button");
        showTaskFormButton.innerHTML = "Create Task";
        showTaskFormButton.addEventListener("click", function() {
            addTaskForm.hidden = false;
            createTaskButton.setAttribute("data-index", projectsArray.indexOf(project));
        });
        let taskDisplay = document.createElement("div")
        project.tasks.forEach(task => {
            if (task != null) {
            let taskPara = document.createElement("p");
            let deleteTaskButton = document.createElement("button");
            deleteTaskButton.innerHTML = "Delete Task";
            taskPara.innerHTML += "<br><br>" + "Task: " + task.title + "<br>" +
            "Description: " + task.description  + "<br>" + 
            "Due Date: " + task.dueDate  + "<br>" +
            "Priority: " + task.priority + "<br>" + 
            "Notes: " + task.notes + "<br><br>";
            deleteTaskButton.setAttribute("data-index", project.tasks.indexOf(task));
            deleteTaskButton.addEventListener("click", function() {
                delete project.tasks[deleteTaskButton.dataset.index];
                saveLocal();
                taskDisplay.removeChild(taskPara);
            });
            taskPara.append(deleteTaskButton);
            taskDisplay.append(taskPara);
            };
        });
        projectDisplay.append(projectPara, taskDisplay, showTaskFormButton, deleteProjectButton);
        projectsContainer.appendChild(projectDisplay);
        };    
    });
};

restoreLocal();
populatePage();
console.log(projectsArray);