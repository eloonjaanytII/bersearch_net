const express = require('express');
const {sequelize} = require('./models/User.js')
const PORT = process.env.PORT || 5000;
const authRouter = require('./routes/authRouter.js')
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json())
app.use(express.static('public'));

app.use('/auth', authRouter)


const start = async () => {
  try{

    await sequelize.authenticate();
    console.log('DB connected');
    await sequelize.sync({ force: false });

    app.listen(PORT, () => console.log('Сервер запущен '))
  }catch(error) {
    console.error('Unable to connect to the database:', error);
  }
}

start()