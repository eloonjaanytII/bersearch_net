const {User} = require('./User');
const {Review} = require('./Review');
const {UserPersonal} = require('./UserPersonal');

User.hasOne(UserPersonal, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
UserPersonal.belongsTo(User, {
  foreignKey: 'userId',
}); 


User.hasMany(Review, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Review.belongsTo(User, {
  foreignKey: 'userId',
})

module.exports = {
    User, 
    Review,
    UserPersonal
}