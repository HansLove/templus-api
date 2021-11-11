

function manejar(_unidad,_cantidad){
    //Masa, convertir todo a kg
    if(_unidad=='g'){
        return _cantidad/1000
    }

    //Volumen, convertir a L
    if(_unidad=='ml'){
        return _cantidad/1000
    }

    return _cantidad
}


