const router = require('express').Router();
let Floor = require('../model/Floor.model');

router.route('/all').get((req, res) => {
    Floor.find()
        .then(Floors => res.json(Floors))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const FloorNo = req.body.floorNo;
    const Rooms = req.body.rooms;
    const newFloor = new Floor({FloorNo, Rooms});
    console.log(req.body);
    console.log(newFloor.FloorNo);

    newFloor.save().then(() => res.json('Floor added')).catch(err => res.status(400).json('Error' + err));

});

router.route('/update').post((req, res) => {
    Floor.findOneAndUpdate(
        {FloorNo: req.body.FloorNo, "Rooms.RoomNo": req.body.RoomNo},
        {$set: {"Rooms.$.CO2Level": req.body.co2L, "Rooms.$.SmokeLevel": req.body.smL, "Rooms.$.Active": req.body.Active}},
        {new: true})
        .then((res) => {
        })
        .catch(err => {
            console.error(err);
        });
});

module.exports = router;