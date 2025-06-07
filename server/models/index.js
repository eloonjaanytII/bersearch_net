const {Actor} = require('./Actor');
const {Director} = require('./Director');
const {Film} = require('./Film');
const {User} = require('./User');
const {Review} = require('./Review');
const {UserFilms} = require('./UserFilms');
const {ActorsFilms} = require('./ActorsFilms');
const {DirectorsFilms} = require('./DirectorsFilms');

// Связь пользователя с его рецензиями
User.hasMany(Review, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Review.belongsTo(User, {
  foreignKey: 'userId',
})

// Связь пользователя с фильмами
User.belongsToMany(Film, {
  through: UserFilms,
  foreignKey: 'userId',
  otherKey: 'kinopoiskId',
  onDelete: 'CASCADE'
})

Film.belongsToMany(User, {
  through: UserFilms,
  foreignKey: 'kinopoiskId',
  otherKey: 'userId',
  onDelete: 'CASCADE'
})

// Связь актёров с фильмами
Actor.belongsToMany(Film, {
  through: ActorsFilms,
  foreignKey: 'staffId',
  otherKey: 'kinopoiskId',
  onDelete: 'CASCADE'
})

Film.belongsToMany(Actor, {
  through: ActorsFilms,
  foreignKey: 'kinopoiskId',
  otherKey: 'staffId',
  onDelete: 'CASCADE'
})

// Связь режиссёров с фильмами
Director.belongsToMany(Film, {
  through: DirectorsFilms,
  foreignKey: 'staffId',
  otherKey: 'kinopoiskId',
  onDelete: 'CASCADE'
})

Film.belongsToMany(Director, {
  through: DirectorsFilms,
  foreignKey: 'kinopoiskId',
  otherKey: 'staffId',
  onDelete: 'CASCADE'
})

module.exports = {
    Actor, 
    Director,
    Film,
    User,
    Review,
    UserFilms,
    ActorsFilms,
    DirectorsFilms
}