'use strict';
module.exports = (sequelize, DataTypes) => {
  const cursa = sequelize.define('cursa', {
    id_usuario: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true
      },
    },
    id_materia: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true
      }
    },
    cuatrimestre: DataTypes.STRING
  }, {});
  cursa.associate = function(models) {
    // associations can be defined here
    cursa.belongsTo(models.materia, {
      as: "Materias-Relacionadas",
      foreignKey: "id",
      sourceKey: 'id_materia'
    });
    cursa.belongsTo(models.usuario, {
      as: "Usuarios-Relacionados",
      foreignKey: "id",
      sourceKey: 'id_usuario'
    })
  };
  return cursa;
};