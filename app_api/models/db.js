// @Созданния соединения
let mongoose = require('mongoose');
// @Добавляем мониторинг событий - все что нижу написано
// /Loc8r - название БД которое мы прописали в roboto 3t
let dbURI = 'mongodb://localhost/Loc8r';
mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error - ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log(`Mongoose disconnected`);
});
//Node.js
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    gracefulShutdown('app shutdown', () => {
        process.exit(0);
    });
});

let gracefulShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// @Внедрение модели
require('./location');
