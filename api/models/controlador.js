'use strict';
module.exports = (sequelize, DataTypes) => {
  const controlador = sequelize.define('controlador', {
    id_usuario: DataTypes.INTEGER,
    tabla: DataTypes.STRING,
    accion: DataTypes.STRING,
    fecha_hora: DataTypes.DATE
  }, {});
  controlador.associate = function(models) {
    // associations can be defined here 
    // controlador.belongsTo(models.usuarios, {
    //   as : 'Usuario-Relacionado',
    //   foreignKey: 'id_usuario',
      // sourceKey: 'id'
    // })
    controlador.belongsTo(models.usuario, {
      as: "Usuarios-Relacionados",
      foreignKey: "id_usuario"
      // sourceKey: 'id'
    });
  };
  return controlador;
};