const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = 'mongodb+srv://geoffnix:HotNix1969!@cluster0.fknjfgt.mongodb.net/travl?retryWrites=true&w=majority';
const readLine = require('readline');

mongoose.set('useUnifiedTopology', true);

const connect = () => {
    setTimeout(() => mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useCreateIndex: true
    }), 1000);
}

mongoose.connection.on('connected', () => {

});

mongoose.connection.on('error', () => {

});

mongoose.connection.on('disconnected', () => {

});

if(process.platform === 'win32') {

}

const gratefulShutdown = (msg, callback) => {

};

//Nodemon restarts
process.once('SIGUSR2', () => {});
//App termination
process.on('SIGINT', () => {});
//Heroku app termination
process.on('SIGTERM', () => {});

connect();

require('./models/travlr');