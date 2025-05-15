const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('bersearch', 'postgres', 'eb2fae135', {
  host: 'localhost',
  port: 5432,   
  dialect: 'postgres',
});

const User = sequelize.define(
  'User',
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
);

const Role = sequelize.define(
  'Role',
  {
    name: {
        type: DataTypes.STRING, 
        unique: true,
        allowNull: false,
        defaultValue: 'USER',
    }
  },
);

Role.hasMany(User, {foreignKey: 'roleId'});
User.belongsTo(Role, {foreignKey: 'roleId'});


module.exports = {sequelize, User, Role}
