const {User} = require('./User');
const {UserPersonal} = require('./UserPersonal');

User.hasOne(UserPersonal, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
UserPersonal.belongsTo(User, {
  foreignKey: 'userId',
}); 

module.exports = {
    User, 
    UserPersonal
}