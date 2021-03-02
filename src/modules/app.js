// imports
import createProject from "./projects";
import createTask from './tasks';
// creating array to store projects
let projectsArray = [];
// targeting html elements
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
const editProjectForm = document.getElementById("edit-project-form");
const saveProjectButton = document.getElementById("edit-project");
const editProjectTitle = document.getElementById("edit-project-title");
const editProjectDescription = document.getElementById("edit-project-description");
const editProjectDueDate = document.getElementById("edit-project-due-date");
// event listeners for static buttons
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
        let newTask = createTask(taskTitle.value, taskDescription.value, taskDueDate.value, 
            taskPriority.value, taskNotes.value);
        projectsArray[createTaskButton.dataset.index].tasks.push(newTask);
        saveLocal();
        addTaskForm.hidden = true;
        populatePage();
    };
});
saveProjectButton.addEventListener("click", function editProject() {
    projectsArray[saveProjectButton.dataset.index].title = editProjectTitle.value;
    projectsArray[saveProjectButton.dataset.index].description = editProjectDescription.value;
    projectsArray[saveProjectButton.dataset.index].dueDate = editProjectDueDate.value;
    saveLocal();
    editProjectForm.hidden = true;
    populatePage();
    console.log(projectsArray);
});    
// local storage
function saveLocal() {
    localStorage.setItem("projectsArray", JSON.stringify(projectsArray));
};
function restoreLocal() {
    projectsArray = (JSON.parse(localStorage.getItem("projectsArray")));
    if ((projectsArray === null) || (projectsArray.every(element => element === null))) projectsArray = [];
};
// DOM manipulation
function populatePage() {
    projectsContainer.innerHTML = "";
    projectsArray.forEach(project => {
        if (project != null) {
            // displaying projects on the page
            let projectDisplay = document.createElement("div");
            let projectPara = document.createElement("p");
            // projectPara.setAttribute("contenteditable", true);
            let deleteProjectButton = document.createElement("button");
            projectPara.innerHTML = "Project: " + project.title + "<br>" + 
            "Description: " + project.description + "<br>" +
            "Due Date: " + project.dueDate;
            deleteProjectButton.innerText = "Delete Project";
            deleteProjectButton.setAttribute("data-index", projectsArray.indexOf(project));
            // delete project button listener
            deleteProjectButton.addEventListener("click", function() {
                delete projectsArray[deleteProjectButton.dataset.index];
                saveLocal();
                projectsContainer.removeChild(projectDisplay);
            });
            // creating button to edit project
            let editProjectButton = document.createElement("button");
            editProjectButton.innerHTML = "Edit Project";
            // edit project button listener
            editProjectButton.addEventListener("click", function() {
                editProjectForm.hidden = false;
                saveProjectButton.setAttribute("data-index", projectsArray.indexOf(project));
                editProjectTitle.value = project.title;
                editProjectDescription.value = project.description;
                editProjectDueDate.value = project.dueDate;
            });
            // creating button to prompt new task form
            let showTaskFormButton = document.createElement("button");
            showTaskFormButton.innerHTML = "Create Task";
            showTaskFormButton.addEventListener("click", function() {
                addTaskForm.hidden = false;
                createTaskButton.setAttribute("data-index", projectsArray.indexOf(project));
            });
            // creating a div for tasks for each project
            let taskDisplay = document.createElement("div");
            taskDisplay.setAttribute("hidden", true);
            // creating a button to hide/show tasks
            let showTasksButton = document.createElement("button");
            showTasksButton.addEventListener("click", function() {
                if (taskDisplay.hidden) {
                    taskDisplay.hidden = false;
                    showTasksButton.innerHTML = "Hide Tasks";
                } else {
                    taskDisplay.hidden = true;
                    showTasksButton.innerHTML = "Show Tasks";
                }
            });
            showTasksButton.innerHTML = "Show Tasks";
            // makes sure hide/show button is only visible if the 
            // project actually has tasks
            function checkTasks() {
                if (project.tasks.every(element => element === null)) {
                    showTasksButton.setAttribute("hidden", true);
                };   
            };
            checkTasks();
            // looping through each project and displaying its tasks     
            project.tasks.forEach(task => {
                if (task != null) {
                let taskPara = document.createElement("p");
                // taskPara.setAttribute("contenteditable", true);
                let deleteTaskButton = document.createElement("button");
                deleteTaskButton.innerHTML = "Delete Task";
                taskPara.innerHTML += "<br><br>" + "Task: " + task.title + "<br>" +
                "Description: " + task.description  + "<br>" + 
                "Due Date: " + task.dueDate  + "<br>" +
                "Priority: " + task.priority + "<br>" + 
                "Notes: " + task.notes + "<br><br>";
                deleteTaskButton.setAttribute("data-index", project.tasks.indexOf(task));
                // delete task button listener
                deleteTaskButton.addEventListener("click", function() {
                    delete project.tasks[deleteTaskButton.dataset.index];
                    checkTasks();
                    saveLocal();
                    taskDisplay.removeChild(taskPara);
                });
                // appending elements to their parents
                taskDisplay.append(taskPara, deleteTaskButton);
                };
            });
            projectDisplay.append(projectPara, taskDisplay, showTasksButton,
                showTaskFormButton, editProjectButton, deleteProjectButton);
            projectsContainer.appendChild(projectDisplay);
        };    
    });
};
// these run when page is loaded
restoreLocal();
populatePage();
console.log(projectsArray);