// @Создание модели
let mongoose = require('mongoose');

// @Описание поддокумента
// Для этого нужно создавать новые схемы - что важно перед схемой где будут использоваться
// поддокументы - После этого нужно добавить этот поддокумент как тип данных
// К примеру в LocationSchema - это openingTimes: [openingTimeSchema]

let openingTimeSchema = new mongoose.Schema({
    days: {type: String, required: true},
    opening: String,
    closing: String,
    closed: {type: Boolean, required: true}
});

// Схума для отзывов
let reviewSchema = new mongoose.Schema({
    author: String,
    rating: {type: Number, required: true, min: 0, max: 5},
    reviewText: String,
    createdOn: {type: Date, 'default': Date.now}
});

// =================================================================
// index: '2dsphere' - это что б монго поняла что мы используем координаты
let locationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: String,
    rating: {type: Number, 'default': 0, min: 0, max: 5},
    facilities: [String],
    coords: {type: [Number], index: '2dsphere'},
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema]
});
// @Используеться для подключения
mongoose.model('locations', locationSchema);