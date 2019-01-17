Навигация:
@Создание и настройка проэкта
@Контроллеры
@Шаблонизатор ejs
@Создание статического сайте Node.js + express
===== @Создание и настройка проэкта =====
1. Установить в Node js
2. В корневой папке выполнить команду express
3. npm i
4. Выполнить команду npm start 
5. Запустить http://localhost:3000/
6. Для того что бы сервер автоматически обновлялся нужно ввести
npm i nodemon и потом просто в терминале вместо npm start выполнить команду nodemon
7. Создать папку app_server и сделать структуру как там
8. В app.js после переноса папок routers и views проставить верные пути

////Проблемы после перемещения:
    указать верные пути- например
    let indexRouter = require('./app_server/routes/index');
    let usersRouter = require('./app_server/routes/users');
    
    let app = express();
    
    //view engine setup
    app.set('views', path.join(__dirname, 'app_server', 'views'));
    
    Удалить выполнение сервера
    netstat -ano | findstr :3000
    taskkill /PID 9192 - номер PID берется с команды что выше в последней колонки
/////Запустить сервер снова

===== @Шаблонизатор ejs =====
site https://ejs.co/
<%#  не будет выводиться комментарий %>
@Ускорение рендера
===== @Контроллеры =====
В папке controllers сщздать main.js
@Создание контроллера
@Подключение контроллера
@Использование контроллера
============ @Создание статического сайте Node.js + express ========
Для этого создано 
router.get('/', locationController.homelist);
router.get('/location', locationController.locationInfo);
router.get('/location/review/new', locationController.addReview);
router.get('/about', otherController.about);
MVC - Концепция