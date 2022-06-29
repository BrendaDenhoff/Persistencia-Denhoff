var express = require("express");
var router = express.Router();
var models = require("../models");
const cont = require("../controlador/autorizacion.js")

router.get("/:paginaActual&:cantidad", cont, (req, res) => {
  models.cursa
    .findAll({
      offset: (parseInt(req.params.paginaActual) * parseInt(req.params.cantidad)), 
      limit: parseInt(req.params.cantidad),
      attributes: ["id", "id_usuario", "id_materia", "cuatrimestre"],
      include: [{as: 'Materias-Relacionadas', model:models.materia, attributes: ["id", "nombre"]}, 
                {as: 'Usuarios-Relacionados', model:models.usuario, attributes: ["id", "nombre"]}]
    })
    .then(cursas => res.send(cursas))
    .catch(() => res.sendStatus(500));
});
 
router.post("/", cont, (req, res) => {
  models.cursa
    .create({ id_usuario: req.body.id_usuario, id_materia: req.body.id_materia, cuatrimestre: req.body.cuatrimestre })
    .then(cursa => res.status(201).send({ id: cursa.id }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otra cursa con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
});

const findcursa = (id, { onSuccess, onNotFound, onError }) => {
  models.cursa
    .findOne({
      attributes: ["id", "id_usuario", "id_materia", "cuatrimestre"],
      where: { id }
    })
    .then(cursa => (cursa ? onSuccess(cursa) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id", cont, (req, res) => {
  findcursa(req.params.id, {
    onSuccess: cursa => res.send(cursa),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id", cont, (req, res) => {
  const onSuccess = cursa =>
    cursa
      .update({ id_usuario: req.body.id_usuario, id_materia: req.body.id_materia, cuatrimestre: req.body.cuatrimestre }, { fields: ["id_usuario", "id_materia", "cuatrimestre"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otra cursa con el mismo nombre')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
    findcursa(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id", cont, (req, res) => {
  const onSuccess = cursa =>
    cursa
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findcursa(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;
