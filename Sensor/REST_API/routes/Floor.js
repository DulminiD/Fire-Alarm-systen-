const router = require('express').Router();
let Floor = require('../model/Floor.model');
const axios = require('axios');


router.route('/all').get((req, res) => {
    Floor.find()
        .then(Floors => res.json(Floors))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addFloor').post(async (req, res) => {
    const data = await axios.get(`http://localhost:5000/getFloorCount`).then((response) => {
        console.log(response.data.count);
        const FloorNo = response.data.count + 1;
        const Rooms = [];
        const newFloor = new Floor({FloorNo, Rooms});

        newFloor.save().then(() => res.json('Floor added')).catch(err => res.status(400).json('Error' + err));
    });
});

router.route('/addRoom/:no').post(async (req, res) => {
    const data = await axios.get(`http://localhost:5000/getRoomsCount/${req.params.no}`).then((response) => {
        Floor.update({FloorNo: req.params.no}, {
            $push: {
                Rooms: {
                    "RoomNo": response.data.count + 1,
                    "Active": true,
                    "SmokeLevel": 0,
                    "CO2Level": 0
                }
            }
        }).then(() => res.json('Done'));
    });
});

router.route('/getRoomsCount/:no').get((req, res) => {
    Floor.findOne({FloorNo: req.params.no})
        .then(Floor => {
            res.send({count: Floor.Rooms.length})
        });
});

router.route('/getFloorCount').get((req, res) => {
    Floor.find()
        .then(Floors => res.send({count: Floors.length}))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update').post((req, res) => {
    Floor.findOneAndUpdate(
        {FloorNo: req.body.FloorNo, "Rooms.RoomNo": req.body.RoomNo},
        {
            $set: {
                "Rooms.$.CO2Level": req.body.co2L,
                "Rooms.$.SmokeLevel": req.body.smL,
                "Rooms.$.Active": req.body.Active
            }
        },
        {new: true})
        .then((res) => {
        })
        .catch(err => {
            console.error(err);
        });
});

module.exports = router;