const fs = require('fs');

let listaPorHacer = [];

const guardarDB = () => {
    //el json.stringify sirve para convertir el listado en un objeto legible para json.
    let data = JSON.stringify(listaPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });

}

const cargarDB = () => {

    try {
        listaPorHacer = require('../db/data.json');
    } catch (error) {
        listaPorHacer = [];
    }



}

const crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion: descripcion,
        completado: false
    };

    listaPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listaPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    //lo que hace es buscar dentro del listado si coincide la descripcion que hay en la base de datos con la que esta intrudiciondo.
    let index = listaPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listaPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listaPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    });

    if (listaPorHacer.length === nuevoListado) {
        return false;
    } else {
        listaPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}