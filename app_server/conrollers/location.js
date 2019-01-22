let request = require('request');
let apiOptions = {
	server: 'http://localhost:3000'
};

let renderHomePage = (req, res, bodyResponse) => {
	let message;
	if(!(bodyResponse instanceof Array)) {
		message = "Ошибка обращения к API";
		bodyResponse = [];
	} else {
		if(!bodyResponse.length) {
			message = "Нет мест поблизости";
		}
	}

	res.render('locations-list', {
		title: 'Loc8r - Найдите место для работы рядом!',
		pageHeader: {
			title: 'Loc8r',
			strapline: 'Найдите место для работы рядом!'
		},
		sidebar: "Ищете хорошее место для отдыха? Loc8r поможет вам найти место" 
		+ "по душе где вы сможете удобно поработать. Возможно с кофе, пироженным или пиццей. Loc8r поможет найти " 
		+ "вам любое место",
		locations: bodyResponse,
		message
	});
};

let _formatDistance = function(distance) {
	let numDistance, unit;
	if(distance > 1000) {
		numDistance = parseFloat(distance/1000).toFixed(1);
		unit = ' км';
	} else {
		numDistance = parseInt(distance);
		unit = ' м';
	}
	return numDistance + unit;
};

module.exports.homelist = function(req, res) {
	let requestOption, url;
	url = apiOptions.server + '/api/locations';
	requestOption = {
		method: 'GET',
		json: {},
		qs: {
			lng: 50.9749046,
			lat: 30.4715074
		}
	};

	request(url, requestOption,(err, response, body) => {
		let i, data;
		data = body;
		if(response.statusCode === 200 && data.length) {
			for(i = 0; i < data.length; i++) {
				data[i].distance = _formatDistance(data[i].distance);
			}
		}

		renderHomePage(req, res, data);
	});

};

module.exports.locationInfo = function(req, res) {
	res.render('location-info', {
		title: 'Сушия',
		pageHeader: {title: 'Сушия'},
		sidebar: {
			context: 'Сушия на Loc8r потому что это прекрасное время где можно провести время и заняться продуктивной работой.',
			callToAction: 'Если вы здесь были и вам понравилось, ну или нет - пожалуйста оставьте отзыв, чтобы помочь другим пользователям.'
		},
		location: {
			title: 'Сушия',
			address: 'Невский проспект, 108',
			rating: 3,
			facilities: ['Горячие напитки', 'Вкусные роллы', 'Хороший вай-фай'],
			coords: {lat: 59.9317527, lng: 30.355245},
			openingTimes: [{
				days: 'понедельник - пятница',
				opening: '07:00',
				closing: '19:00',
				closed: false
			},{
				days: 'суббота',
				opening: '08:00',
				closing: '17:00',
				closed: false
			}, {
				days: 'воскресенье',
				closed: true
			}],
			reviews: [{
				author: 'Иван Иванов',
				rating: 5,
				timestamp : '22.07.2017',
				reviewText: 'Какое чудное место. Я обязательно приду сюда еще раз!',
			}, {
				author: 'Петр Петров',
				rating: 3,
				timestamp : '22.06.2017',
				reviewText: 'Всё было хорошо. Кофе не был хорошим, зато вай-фай шикарен.',
			}]
		}
	});
};

module.exports.addReview = function(req, res) {
	res.render('location-review-form', {
		title: 'Добавить обзор на "Сушия" на Loc8r',
		pageHeader: {title: 'Добавить обзор на "Сушия"'}
	});
};