'use strict';
module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define('carrera', {
    nombre: DataTypes.STRING
  }, {});
  carrera.associate = function(models) {
    carrera.hasMany(models.usuario, {
      as: "Usuarios-Relacionados",
      foreignKey: "id_carrera",
      sourceKey: 'id'
    });
    carrera.hasMany(models.materia, {
      as: "Materias-Relacionadas",
      foreignKey: "id_carrera",
      sourceKey: 'id'
    })
  }
  return carrera;
};