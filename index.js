let type = {
  string: function (campo) {
    let dato = typeof campo === "string" ? true : false;
    return dato;
  },
  email: function (email) {
    const ExpRegularEmail =
      /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return ExpRegularEmail.test(email);
  },
  number: function (campo) {
    let dato = typeof campo === "number" ? true : false;
    return dato;
  },
  boolean: function (campo) {
    let dato = typeof campo === "boolean" ? true : false;
    return dato;
  },
  password: function (password) {
    const ExpRegularPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/;
    return ExpRegularPassword.test(password);
  },
  empty: function (campo) {
    let dato = campo === "" ? true : false;
    return dato;
  },
  max: function (campo, maximo) {
    if (typeof campo === "string") {
      let dato = campo.length <= maximo ? true : false;
      return dato;
    }
    if (typeof campo === "number") {
      let dato = campo <= maximo ? true : false;
      return dato;
    }
  },
  min: function (campo, minimo) {
    if (typeof campo === "string") {
      let dato = campo.length >= minimo ? true : false;
      return dato;
    }
    if (typeof campo === "number") {
      let dato = campo >= minimo ? true : false;
      return dato;
    }
  },
};


function ValidarEsquema(Constructor, mode = 'default') {
  let msg = [];
  let Respuesta = {};
  for (const [key, values] of Object.entries(Constructor[0])) {
    // vetificar si estan vacios
    if (values?.empty === false) {
      if (type.empty(values.value)) {
        msg.push(
          values.msg || `${key} es un tipo de dato que no debe estar vacío`
        );
      }
    }
    // Validacines de tipo de datos
    if (type[values.type](values.value)) {
      Respuesta[key] = values.value;
    } else {
      msg.push(values.msg || `${key} es un tipo de dato no valido`);
    }
    // Verificar maximos
    if (values.max) {
      if (type.max(values.value, values.max)) {
        Respuesta[key] = values.value;
      } else {
        msg.push(values.msg || `${key} debe ser maximo de ${values.max}`);
      }
    }
    // Verificar minimos
    if (values.min) {
      if (type.min(values.value, values.min)) {
        Respuesta[key] = values.value;
      } else {
        msg.push(values.msg || `${key} debe ser minimo de ${values.min}`);
      }
    }
  }

  if (msg.length >= 1) {
    let msgFilter = msg.filter((item,index)=>{
      return msg.indexOf(item) === index;
    })
    return { Result: "Errors", Response: msgFilter };
  } else {
    if (mode === 'create') {
      Respuesta["create_at"] = new Intl.DateTimeFormat("es", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date());
      Respuesta["update_at"] = new Intl.DateTimeFormat("es", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date())
    }
    if (mode === 'update') {
      Respuesta["update_at"] = new Intl.DateTimeFormat("es", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date())
    }
    return { Result: "Validate", Response: Respuesta };
  }
}

function isImageValidate(originalname , size, max=800000){
  let extFile = originalname.split('.')[1] 
  if(extFile === 'jpg' || extFile === 'jpeg'|| extFile === 'png' && !(size >= max)){
    return { validation: true, msg: 'Tipo de archivo valido' };
  }else{
    return { validation: false, msg: 'Tipo de archivo no valido o tamaño muy pesado' };
  }
}

module.exports = { ValidarEsquema, isImageValidate }
