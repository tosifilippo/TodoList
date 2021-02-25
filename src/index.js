import createTask from './modules/tasks.js';
import createProject from './modules/projects.js';
import showProjectForm from './modules/dom.js';
import addProject from './modules/dom.js';
import projectsArray from './modules/dom.js';

function restoreLocal() {
    projectsArray = (JSON.parse(localStorage.getItem("projectsArray")));
    if (projectsArray === null) projectsArray = [];
};

restoreLocal();