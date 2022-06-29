'use strict';
module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define('materia', {
    nombre: {
      type: DataTypes.STRING,
      validate: {
        is: ["^[a-z 1-9]+$",'i']  
      }
    },
    id_carrera: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true  
      }
    }
  }, {});
  materia.associate = function(models) {
    // associations can be defined here
    materia.belongsTo(models.carrera, {
      as : 'Carrera-Relacionada',
      foreignKey: 'id_carrera',
      // sourceKey: 'id'
    })
  };
  return materia;
};