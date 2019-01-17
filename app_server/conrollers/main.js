// @Создание контроллера
module.exports.index = (req, res, next) => {
    res.render('index', { title: 'Express', text: 'МОЙ МИР'});
};