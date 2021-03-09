// imports
import createProject from './projects'
import createTask from './tasks'
import { parseISO, formatDistanceToNow, isPast } from 'date-fns'
// creating array to store projects
let projectsArray = []
// targeting html elements
const showProjectFormButton = document.getElementById('show-project-form')
const addProjectForm = document.getElementById('add-project-form')
const addProjectButton = document.getElementById('add-project')
const projectTitle = document.getElementById('project-title')
const projectDescription = document.getElementById('project-description')
const projectDueDate = document.getElementById('project-due-date')
const projectsContainer = document.getElementById('projects-container')
const addTaskForm = document.getElementById('add-task-form')
const createTaskButton = document.getElementById('add-task')
const taskTitle = document.getElementById('task-title')
const taskDescription = document.getElementById('task-description')
const taskDueDate = document.getElementById('task-due-date')
const taskPriority = document.getElementById('task-priority')
const taskNotes = document.getElementById('task-notes')
const editProjectForm = document.getElementById('edit-project-form')
const saveProjectButton = document.getElementById('edit-project')
const editProjectTitle = document.getElementById('edit-project-title')
const editProjectDescription = document.getElementById('edit-project-description')
const editProjectDueDate = document.getElementById('edit-project-due-date')
const editTaskForm = document.getElementById('edit-task-form')
const saveTaskButton = document.getElementById('edit-task')
const editTaskTitle = document.getElementById('edit-task-title')
const editTaskDescription = document.getElementById('edit-task-description')
const editTaskDueDate = document.getElementById('edit-task-due-date')
const editTaskPriority = document.getElementById('edit-task-priority')
const editTaskNotes = document.getElementById('edit-task-notes')
const xProjectForm = document.getElementById('x-project-form')
const xEditProject = document.getElementById('x-edit-project')
const xTaskForm = document.getElementById('x-task-form')
const xEditTask = document.getElementById('x-edit-task')
const sidebar = document.getElementById('sidebar-container')
// event listeners for static buttons
// shows project form
showProjectFormButton.addEventListener('click', function showProjectForm () {
  addProjectForm.hidden = false
})
// creates project
addProjectButton.addEventListener('click', function addProject () {
  if (projectTitle.value !== '' && projectDescription.value !== '' && projectDueDate.value !== '') {
    const newProject = createProject(projectTitle.value, projectDescription.value, projectDueDate.value)
    projectsArray.push(newProject)
    saveLocal()
    addProjectForm.hidden = true
    populatePage()
    const projectNode = document.querySelectorAll(`[data-index="${projectsArray.length - 1}"]`)
    projectNode.forEach(element => {
      element.hidden = false
    })
  };
})
// creates task
createTaskButton.addEventListener('click', function addTask () {
  if (taskTitle.value !== '' && taskDescription.value !== '' && taskDueDate.value !== '' &&
    taskPriority.value !== '' && taskNotes.value !== '') {
    const newTask = createTask(taskTitle.value, taskDescription.value, taskDueDate.value,
      taskPriority.value, taskNotes.value)
    projectsArray[createTaskButton.dataset.index].tasks.push(newTask)
    saveLocal()
    addTaskForm.hidden = true
    populatePage()
    const taskNode = document.querySelectorAll(`[data-index="${createTaskButton.dataset.index}"]`)
    taskNode.forEach(element => {
      element.hidden = false
    })
    const hideShowButtons = document.querySelectorAll('.show-task-button')
    hideShowButtons.forEach(element => {
      if (element.dataset.value === createTaskButton.dataset.index) element.click()
    })
  };
})
// hides project form
xProjectForm.addEventListener('click', function hideProjectForm () {
  addProjectForm.hidden = true
  projectTitle.value = ''
  projectDescription.value = ''
  projectDueDate.value = ''
})
// hides edit project form
xEditProject.addEventListener('click', function hideEditProject () {
  editProjectForm.hidden = true
})
// hides task form
xTaskForm.addEventListener('click', function hideTaskForm () {
  addTaskForm.hidden = true
  taskDescription.value = ''
  taskDueDate.value = ''
  taskNotes.value = ''
  taskPriority.value = ''
  taskTitle.value = ''
})
// hide edit task form
xEditTask.addEventListener('click', function hideEditTask () {
  editTaskForm.hidden = true
})
// local storage
function saveLocal () {
  localStorage.setItem('projectsArray', JSON.stringify(projectsArray))
};
function restoreLocal () {
  projectsArray = (JSON.parse(localStorage.getItem('projectsArray')))
  if ((projectsArray === null) || (projectsArray.every(element => element === null))) projectsArray = []
};
// DOM manipulation
function populatePage () {
  projectsContainer.innerHTML = ''
  sidebar.innerHTML = ''
  projectsArray.forEach(project => {
    if (project != null) {
      // creating sidebar content
      const projectSidebar = document.createElement('button')
      projectSidebar.innerHTML = project.title.toUpperCase() + '<br> Due ' + formatDistanceToNow(parseISO(project.dueDate), { addSuffix: true })
      projectSidebar.classList.add('sidebar-button')
      function checkPast () {
        if (isPast(parseISO(project.dueDate))) {
          projectSidebar.classList.add('expired')
        } else projectSidebar.classList.remove('expired')
      };
      checkPast()
      // sidebar listener
      projectSidebar.addEventListener('click', function () {
        if (projectDisplay.hidden) {
          projectDisplay.hidden = false
        } else {
          projectDisplay.hidden = true
        }
      })
      // displaying projects on the page
      const projectDisplay = document.createElement('div')
      projectDisplay.setAttribute('hidden', true)
      projectDisplay.setAttribute('data-index', projectsArray.indexOf(project))
      projectDisplay.setAttribute('class', 'project-display')
      // saves project edit
      saveProjectButton.addEventListener('click', function editProject () {
        projectsArray[saveProjectButton.dataset.index].title = editProjectTitle.value
        projectsArray[saveProjectButton.dataset.index].description = editProjectDescription.value
        projectsArray[saveProjectButton.dataset.index].dueDate = editProjectDueDate.value
        saveLocal()
        editProjectForm.hidden = true
        projectSidebar.innerHTML = project.title.toUpperCase() + '<br> Due ' + formatDistanceToNow(parseISO(project.dueDate), { addSuffix: true })
        populatePara()
        checkPast()
      })
      const projectPara = document.createElement('p')
      const deleteProjectButton = document.createElement('button')
      function populatePara () {
        projectPara.innerHTML = '<br>Project: ' + project.title + '<br>' +
            'Description: ' + project.description + '<br>' +
            'Due Date: ' + formatDistanceToNow(parseISO(project.dueDate), { addSuffix: true })
      };
      populatePara()
      deleteProjectButton.innerText = 'Delete Project'
      deleteProjectButton.setAttribute('data-index', projectsArray.indexOf(project))
      // delete project button listener
      deleteProjectButton.addEventListener('click', function () {
        delete projectsArray[deleteProjectButton.dataset.index]
        saveLocal()
        projectsContainer.removeChild(projectDisplay)
        sidebar.removeChild(projectSidebar)
      })
      // creating button to edit project
      const editProjectButton = document.createElement('button')
      editProjectButton.innerHTML = 'Edit Project'
      // edit project button listener
      editProjectButton.addEventListener('click', function () {
        editProjectForm.hidden = false
        saveProjectButton.setAttribute('data-index', projectsArray.indexOf(project))
        editProjectTitle.value = project.title
        editProjectDescription.value = project.description
        editProjectDueDate.value = project.dueDate
      })
      // creating button to prompt new task form
      const showTaskFormButton = document.createElement('button')
      showTaskFormButton.innerHTML = 'Add Task'
      showTaskFormButton.addEventListener('click', function () {
        addTaskForm.hidden = false
        createTaskButton.setAttribute('data-index', projectsArray.indexOf(project))
      })
      // creating a div for tasks for each project
      const taskDisplay = document.createElement('div')
      taskDisplay.setAttribute('hidden', true)
      // creating a button to hide/show tasks
      const showTasksButton = document.createElement('button')
      showTasksButton.classList.add('show-task-button')
      showTasksButton.setAttribute('data-value', projectsArray.indexOf(project))
      showTasksButton.addEventListener('click', function () {
        if (taskDisplay.hidden) {
          taskDisplay.hidden = false
          showTasksButton.innerHTML = 'Hide Tasks'
        } else {
          taskDisplay.hidden = true
          showTasksButton.innerHTML = 'Show Tasks'
        };
      })
      showTasksButton.innerHTML = 'Show Tasks'
      // makes sure hide/show button is only visible if the
      // project actually has tasks
      function checkTasks () {
        if (project.tasks.every(element => element === null)) {
          showTasksButton.setAttribute('hidden', true)
        };
      };
      checkTasks()
      // looping through each project and displaying its tasks
      project.tasks.forEach(task => {
        if (task != null) {
          // saves task edit
          saveTaskButton.addEventListener('click', function editTask () {
            projectsArray[saveTaskButton.dataset.projectindex]
              .tasks[saveTaskButton.dataset.taskindex].title = editTaskTitle.value
            projectsArray[saveTaskButton.dataset.projectindex]
              .tasks[saveTaskButton.dataset.taskindex].description = editTaskDescription.value
            projectsArray[saveTaskButton.dataset.projectindex]
              .tasks[saveTaskButton.dataset.taskindex].dueDate = editTaskDueDate.value
            projectsArray[saveTaskButton.dataset.projectindex]
              .tasks[saveTaskButton.dataset.taskindex].priority = editTaskPriority.value
            projectsArray[saveTaskButton.dataset.projectindex]
              .tasks[saveTaskButton.dataset.taskindex].notes = editTaskNotes.value
            saveLocal()
            editTaskForm.hidden = true
            populateTask()
          })
          const taskPara = document.createElement('p')
          taskPara.classList.add('task-para')
          const deleteTaskButton = document.createElement('button')
          deleteTaskButton.innerHTML = 'Delete Task'
          const editTaskButton = document.createElement('button')
          editTaskButton.innerHTML = 'Edit Task'
          function populateTask () {
            if (task != null) {
              taskPara.innerHTML = '<br>Task: ' + task.title + '<br>' +
                            'Description: ' + task.description + '<br>' +
                            'Due Date: ' + formatDistanceToNow(parseISO(task.dueDate), { addSuffix: true }) + '<br>' +
                            'Priority: ' + task.priority + '<br>' +
                            'Notes: ' + task.notes + '<br>'
              // appending elements to their parents
              taskPara.append(editTaskButton, deleteTaskButton)
            };
          };
          populateTask()
          taskDisplay.append(taskPara)
          deleteTaskButton.setAttribute('data-index', project.tasks.indexOf(task))
          // delete task button listener
          deleteTaskButton.addEventListener('click', function () {
            delete project.tasks[deleteTaskButton.dataset.index]
            checkTasks()
            saveLocal()
            taskDisplay.removeChild(taskPara)
          })
          // edit task button listener
          editTaskButton.addEventListener('click', function () {
            editTaskForm.hidden = false
            saveTaskButton.setAttribute('data-projectindex', projectsArray.indexOf(project))
            saveTaskButton.setAttribute('data-taskindex', project.tasks.indexOf(task))
            editTaskTitle.value = task.title
            editTaskDescription.value = task.description
            editTaskDueDate.value = task.dueDate
            editTaskPriority.value = task.priority
            editTaskNotes.value = task.notes
          })
        };
      })
      projectDisplay.append(projectPara, taskDisplay, showTasksButton,
        showTaskFormButton, editProjectButton, deleteProjectButton)
      projectsContainer.appendChild(projectDisplay)
      sidebar.appendChild(projectSidebar)
    };
  })
};
// these run when page is loaded
restoreLocal()
populatePage()
