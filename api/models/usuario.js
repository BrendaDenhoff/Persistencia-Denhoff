'use strict';
module.exports = (sequelize, DataTypes) => {
  const usuario = sequelize.define('usuario', {
    nombre: { 
      type: DataTypes.STRING,
      validate: {
        is: ["^[a-z ]+$",'i']        
      }
    },
    apellido: {
      type: DataTypes.STRING,
      validate: {
        is: ["^[a-z ]+$",'i']         
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true  
      }
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      validate: {
        isDate: true  
      }
    },
    edad: {
      type: new DataTypes.VIRTUAL(DataTypes.INTEGER, ['fecha_nacimiento']),
      get: function() {
        return Math.floor(
          (new Date() - new Date(this.get('fecha_nacimiento'))) / (1000 * 60 * 60 * 24 * 365.25)
        );
      }
    },
    dni: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
        len: [7,8]  
      }
    },
    contrasenia: DataTypes.STRING,
    id_carrera: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true  
      },
    },
    token: {
      type: DataTypes.TEXT
    },
  }, {});
  usuario.associate = function(models) {
    // associations can be defined here
    usuario.belongsTo(models.carrera, {
      as : 'Carrera-Relacionada',
      foreignKey: 'id_carrera'
    })
  };
  return usuario;
};
