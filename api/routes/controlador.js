var express = require("express");
var router = express.Router();
var models = require("../models");
const autenticacion = require("../autenticacion/autenticacion.js")

router.get("/:paginaActual&:cantidad", autenticacion, (req, res) => {
    models.controlador
    .findAll({
      offset: (parseInt(req.params.paginaActual) * parseInt(req.params.cantidad)), 
      limit: parseInt(req.params.cantidad),
      attributes: ["id", "id_usuario", "tabla", "accion"],
      include: [{as: "Usuarios-Relacionados", model:models.usuario, attributes: ["id", "nombre", "apellido", "dni", "email"]}]
    })
    .then(controladores => res.send(controladores))
    .catch(() => res.sendStatus(500));
});

const findcontrolador = (idUsuario, { onSuccess, onNotFound, onError }) => {
  models.controlador
    .findAll({
      attributes: ["id", "id_usuario", "tabla", "accion"],
      where: { id_usuario: idUsuario }
    })
    .then(controlador => (controlador ? onSuccess(controlador) : onNotFound()))
    .catch(() => onError());
};

router.get("/:idUsuario", autenticacion, (req, res) => {
  findcontrolador(req.params.idUsuario, {
    onSuccess: controlador => res.send(controlador),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;
