let mongoose = require('mongoose');
// @Используеться для подключения
let Loc = mongoose.model('locations');

let sendJSONResponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

module.exports.locationListByDistance = (req, res) => {
    let lng = parseFloat(req.query.lng);
    let lat = parseFloat(req.query.lat);
    if(!lng || !lat) {
        sendJSONResponse(res, 404, {
            "message": "lng and lat query parameters are required"
        });
        return;
    }

    Loc.aggregate(
        [
            {
                '$geoNear': {
                    'near': [lng, lat],
                    'spherical': true,
                    'distanceField': 'dist',
                    'maxDistance': 20000
                }
            }
        ],
        (err, results) => {
            let locations = [];
                if(err) {
                    sendJSONResponse(res, 404, err);
                } else {
                    results.forEach(function(doc) {
                        locations.push({
                            distance: doc.dist,
                            name: doc.name,
                            address: doc.address,
                            rating: doc.rating,
                            facilities: doc.facilities,
                            _id: doc._id
                        });
                    });
                    sendJSONResponse(res, 200, locations);
                }
        }
    )
};

module.exports.locationsCreate = (req, res) => {
    Loc.create({
        name: req.body.name,
        address: req.body.address,
        facilities: req.body.facilities.split(","),
        coords: [parseFloat(req.body.lng),
                parseFloat(req.body.lat)],
        openingTimes: [{
            days: req.body.days1,
            opening: req.body.opening1,
            closing: req.body.closing1,
            closed: req.body. closed1
        }, {
            days: req.body.days2,
            opening: req.body.opening2,
            closing: req.body.closing2,
            closed: req.body. closed2
        }]
    }, (err, location) => {
        if(err) {
            sendJSONResponse(res, 400, err);
        } else {
            sendJSONResponse(res, 201, location);
        }
    });
    sendJSONResponse(res, 200, {'status': 'success'});
};

module.exports.locationsReadOne = (req, res) => {
    if(req.params && req.params['locationid']) {
        Loc.findById(req.params['locationid'])
            .exec((err, location) => {
                if(!location) {
                    sendJSONResponse(res, 404, {
                        "message": "location not found"
                    });
                    return;
                } else if(err) {
                    sendJSONResponse(res, 404, err);
                    return;
                }

                sendJSONResponse(res, 200, location);
            });
    } else {
        sendJSONResponse(res, 404, {
            "message": "No locationid in request"
        });
    }
};

module.exports.locationsUpdateOne = (req, res) => {
    if (!req.params['locationid']) {
        sendJSONResponse(res, 404, {
            "message": "locationid not found"
        });
        return;
    }
    Loc
        .findById(req.params.locationid)
        .select('-reviews - rating')
        .exec(function (err, location) {
            if (!location) {
                sendJSONResponse(res, 404, {
                    "message": "location not found"
                });
                return;
            } else if (err) {
                sendJSONResponse(res, 400, err);
                return;
            }
            location.name = req.body.name;
            location.address = req.body.address;
            location.facilities = req.body.facilities.split(",");
            location.coords = [parseFloat(req.body.lng),
                                parseFloat(req.body.lat)];
            location.openingTimes = [{
                days: req.body.days1,
                opening: req.body.opening1,
                closing: req.body.closing1,
                closed: req.body.closed1
            }, {
                days: req.body.days2,
                opening: req.body.opening2,
                closing: req.body.closing2,
                closed: req.body.closed2
            }];
            location.save((err, location) => {
                if(err) {
                    sendJSONResponse(res, 404, err);
                } else {
                    sendJSONResponse(res, 200, location);
                }
            });
        });
};
module.exports.locationsDeleteOne = (req, res) => {
    let locationid = req.params.locationid;
    if(locationid) {
        Loc
            .findByIdAndRemove(locationid)
            .exec(function(err, location) {
                if(err) {
                    sendJSONResponse(res, 404, err);
                    return;
                }
                sendJSONResponse(res, 204, null);
            })
    } else {
        sendJSONResponse(res, 404, {
            "message": "No locationid"
        });
    }
};

