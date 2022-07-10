# npm i validaresquema


## *Validación de campos para base de datos sin métodos de esquemas*

### Ejemplo de uso:

### 1. Elabore un constructor que retorne un esquema (objeto) con los campos deseados

```javascript
function Constructor(nombre, edad, email, activo) {
  return [
    {
      nombre: {
        value: nombre,
        type: "string",
        empty: false,
        min: 4,
        max: 8,
        msg: 'Nombre no valido'
      },
      edad: {
        value: edad,
        type: "number",
        empty: false,
        max: 110,
        min: 16
      },
      email: {
        value: email,
        type: "email",
        empty: false,
      },
      activo: {
        value: activo,
        type: "boolean"
      }
    }
  ];
}
```



### 2. LLame la funcion validar y le pasa como parametro el constructor del esquema:

```javascript

import { ValidarEsquema } from 'validaresquema'

let User = ValidarEsquema(Constructor("john doe", 20, "mail@mail.com", true));

```

```javascript

const { ValidarEsquema } = require('validaresquema')

let User = ValidarEsquema(Constructor("john doe", 20, "mail@mail.com", true));

```

* Si las validaciones son correctas, la funcion ValidarEsquema devolverá el objeto cons sus valores como propiedades

```javascript

{ 
    Result: "Validate", 
    Response: {
        nombre: "john doe",
        edad: 20,
        email: "mail@mail.com",
        activo: true
    } 
}

```

* Si las validaciones son incorrectas, la funcion ValidarEsquema devolverá el objeto con un array de los erorres en el formato y tipo de los campos.

```javascript

{
  Result: 'Errors',
  Response: [
    'nombre no valido',
    'email es un tipo de dato no valido',
    'activo es un tipo de dato no valido'
  ]
}

```

### Se puede pasar un segundo parametro a la función ValidarEsquema  para añadir los campos create_at y update_at

* El string 'create', añade dos compos:  create_at y update_at

```javascript

let User = ValidarEsquema(Constructor("john doe", 20, "mail@mail.com", true), 'create');

{
  Result: 'Validate',
  Response: {
    nombre: 'john doe',
    edad: 20,
    email: 'mail@mail.com',
    activo: true,
    create_at: 2022-07-10T17:02:14.318Z,
    update_at: 2022-07-10T17:02:14.318Z
  }
}

```

* El string 'update', añade el  campo: update_at

```javascript

let User = ValidarEsquema(Constructor("john doe", 20, "mail@mail.com", true), 'update');

{
  Result: 'Validate',
  Response: {
    nombre: 'john doe',
    edad: 20,
    email: 'mail@mail.com',
    activo: true,
    update_at: 2022-07-10T17:02:14.318Z
  }
}

```

### Campos obligatorios: Cada propiedad debe tener un "value" el cual el constructor le asignará un valor, y cada campo debe tener un "type" donde se le debe indicar el tipo de dato, los tipos de datos soportados son: 

* "string" : Cadena de texto
* "number" : Número
* "email" : Formato valido de un correo electronico
* "password": *El tipo "password" para que sea valido debe incluir al menos un caracter especial {@$!%*?&}, Una mayuscula, Un numero, entre 8-15 caracteres en total.*
* "boolean" : true o false


***

### Validaciones adicionales: 

1. **empty**: true or false, para indicar si el campo puede aceptar o no string vacíos
2. **min**: number, un número para indicar el valor minimo del nuemro o de los caracteres de una cadena de texto
3. **max**: number, un número para indicar el valor maximo del numero o de los caracteres de una cadena de texto
4. **msg**: string, puede pasar su propio mensaje de error para la validación