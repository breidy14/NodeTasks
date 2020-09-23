import proyectos from './moduls/projects';
import tareas from './moduls/tasks';
import menu from './function/menu';
import {actualizarAvance} from './function/avance';

document.addEventListener('DOMContentLoaded', () => {
    actualizarAvance();
})