const descripcion = {
    demand: true, //el demand sirve para decir que sea obligatorio. el campo.
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer'
};

const completado = {
    default: true,
    alias: 'c',
    desc: 'Marca como completado o pendiente la tarea'
};

const argv = require('yargs').command('crear', 'Crear un elemento por hacer', {
    descripcion
}).command('actualizar', 'Actualiza el estado completado de la tarea', {
    descripcion,
    completado
}).command('borrar', 'Borra una tarea', {
    descripcion
}).help().argv;

module.exports = {
    argv
}