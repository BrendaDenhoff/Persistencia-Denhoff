var express = require("express");
var router = express.Router();
var models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const cont = require("../controlador/autorizacion.js")

router.get("/:paginaActual&:cantidad", cont, (req, res) => {
  models.usuario
    .findAll({
      offset: (parseInt(req.params.paginaActual) * parseInt(req.params.cantidad)), 
      limit: parseInt(req.params.cantidad),
      attributes: ["id", "nombre", "apellido", "dni", "fecha_nacimiento", "edad", "email", "id_carrera"],
      include: [{as: 'Carrera-Relacionada', model:models.carrera, attributes: ["id", "nombre"]}],
      order: [['apellido', 'ASC']]
    })
    .then(usuarios => res.send(usuarios))
    .catch(() => res.sendStatus(500));
});

router.post("/sigUp", (req, res) => {
  // Se encripta la contrasenia
  const contraseniaEncriptada = bcrypt.hashSync(req.body.contrasenia, 10) 
  models.usuario
    .create({nombre: req.body.nombre, apellido: req.body.apellido, email: req.body.email, fecha_nacimiento: req.body.fecha_nacimiento, dni:req.body.dni, id_carrera: req.body.id_carrera, contrasenia: contraseniaEncriptada})
    .then(usuario => res.status(201).send(`Bienvenido/a ${usuario.nombre}, el usuario se ha creado con éxito.`))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: el mail o dni ya se encuentran asociado a otra cuenta.')
      } else if (error == "SequelizeValidationError: Validation error: Validation len on dni failed") {
        res.status(400).send('Ingrese un DNI valido.')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });  
  }); 

router.post("/login", (req, res) => {
  // Se busca que exista un usuario registrado con el mail
  models.usuario.findOne({
    where: {email: req.body.email}
  })
  .then(user => {
    if(!user) {
        res.status(404).send(`No existe ninguna cuenta asociada al mail: ${req.body.email}`)
    } else {
        // Si existe un usuario entonces se valida la contrasenia
        if (bcrypt.compareSync(req.body.contrasenia, user.contrasenia)) {
            // Se genera un token
            let token = jwt.sign({ user: user}, "secret", { expiresIn: "24h"});
            res.status(201).send(`Hola de nuevo ${user.nombre}!\nSu token es: ${token}`)    
        } else {
            res.send("Contraseña y/o mail incorrectos")  //TODO
        }
    }
  }).catch(err => {
    res.status(500).send(err)
  })
})

const findusuario = (id, { onSuccess, onNotFound, onError }) => {
  models.usuario
    .findOne({
      attributes: ["id", "nombre", "apellido", "dni", "fecha_nacimiento", "edad", "email", "id_carrera"],
      include: [{as: 'Carrera-Relacionada', model:models.carrera, attributes: ["id", "nombre"]}],
      where: { id }
    })
    .then(usuario => (usuario ? onSuccess(usuario) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id", cont, (req, res) => {
  findusuario(req.params.id, {
    onSuccess: usuario => res.send(usuario),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id", cont, (req, res) => {
  const onSuccess = usuario =>
    usuario
      .update({ nombre: req.body.nombre, apellido: req.body.apellido, dni: req.body.dni, fecha_nacimiento: req.body.fecha_nacimiento, email: req.body.email, id_carrera: req.body.id_carrera,  }, { fields: ["nombre", "apellido", "dni", "fecha_nacimiento", "email", "id_carrera"], })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otra usuario con el mismo nombre')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
    findusuario(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id", cont, (req, res) => {
  const onSuccess = usuario =>
    usuario
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findusuario(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;
