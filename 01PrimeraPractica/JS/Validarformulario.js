function validar(Formulario){ 

//Vamos a crear una funcion para validar un numero minimo de
    if(Formulario.nombre.value.length < 3){
        alert("Por favor ingrese más de 3 caracteres");
        Formulario.nombre.focus();
        return false;
    }

    var abcOK = "QWERTYUIOPASDFGHJKLÑZXCVBNM" + "qwertyuiopasdfghjklñzxcvbnm";
    var checkString = Formulario.nombre.value;
    var allValid = true;
    //tenemos que ir comparando y recorriedno la cadena, caracter por caracter

    for(var i = 0; i < checkString.length; i++){
        var caracter = checkString.charAt(i);

        var esLetra = false;
        for(var j = 0; j < abcOK.length; j++){
            if(caracter === abcOK.charAt(j)){
                esLetra = true;
                break;
            }
        }

        if(!esLetra){
            allValid = false;
            break;
        }
    }

    if (!allValid){
        alert("Por favor escriba solo letras en el nombre");
        Formulario.nombre.focus();
        return false;
    }

    
    var numeros = "1234567890";
    checkString = Formulario.edad.value;
    allValid = true;
    //tenemos que ir comparando y recorriedno la cadena, caracter por caracter

    for(var i = 0; i < checkString.length; i++){
        var caracter = checkString.charAt(i);

        var esnumero = false;
        for(var j = 0; j < numeros.length; j++){
            if(caracter === numeros.charAt(j)){
                esnumero = true;
                break;
            }
        }

        if(!esnumero){
            allValid = false;
            break;
        }
    }

    if (!allValid){
        alert("Por favor escriba solo números en la edad");
        Formulario.edad.focus();
        return false;
    }


    var correoelectronico = /^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/;
    var txt = Formulario.email.value;

    if(!correoelectronico.test(txt)){
        alert("Email no válido");
        Formulario.email.focus();
        return false;
    }

    alert("Formulario válido ");
    return true;
}