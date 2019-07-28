var uuid = require('uuid');
var mongoose = require("mongoose");
const { Models } = require('./model.js');
let dbModels = new Models(mongoose);
const util = require('util');
class DataAccessLayer {
    constructor(db = mongoose, models = dbModels, collectionName = "Bookings", dbHost = 'mongodb://localhost:27017/') {
        this.mongoose = db;
        this.dbHost = dbHost;
        this.collection = collectionName;
        this.dbUrl = this.dbHost + this.collection;
        this.models = models;
    }
    async getDocs(query) {
        try {
            let con = await this.mongoose.connect(this.dbUrl, { useNewUrlParser: true });
            const RoomModel = this.models.getModel("Bookings");
            const res = await RoomModel.find(query);
            return res;
        } catch (error) {
            console.log("Error on get docs of DB");
            return [];
        }
    }
    async saveDoc(req) {
        try {
            await this.mongoose.connect(this.dbUrl, { useNewUrlParser: true });
            const RoomModel = this.models.getModel("Bookings");
            let room = req;
            let roomDocument = new RoomModel(req);
            let newRoomDoc = await roomDocument.save();
            return newRoomDoc;
        } catch (error) {
            console.log("Error on save docs of DB: " + util.inspect(error, null));
            throw new Error(error.message);
        }
    }
    async editDoc(req) {
        try {
            await this.mongoose.connect(this.dbUrl, { useNewUrlParser: true });
            const RoomModel = this.models.getModel("Bookings");
            let query = { id: req.id };
            let data = req;
            let updatedRoomDoc = await RoomModel.findOneAndUpdate(query, data, { new: true });
            return updatedRoomDoc;
        } catch (error) {
            console.log("Error on edit doc of DB");
            return [];
        }
    }
    async removeDoc(query) {
        try {
            await this.mongoose.connect(this.dbUrl, { useNewUrlParser: true });
            const RoomModel = this.models.getModel("Bookings");
            let updatedRoomDoc = RoomModel.findOneAndRemove(query);
            return updatedRoomDoc;
        } catch (error) {
            console.log("Error on remove doc of DB");
            return [];
        }

    }
}

module.exports = { DataAccessLayer };


const DummyData = [{
        "id": "eaf3458cf772",
        "name": "Economy Single Room",
        "user_id": "7",
        "required_points": 260
    },
    {
        "id": "d635c003-fffc-4beb-87b8-eaf3458cf662",
        "name": "Luxury Single Room",
        "available_amount": 10,
        "required_points": 960
    },
    {
        "id": "d635c003-fffc-4beb-87b8-eaf3458cf442",
        "name": "Economy Double Room",
        "available_amount": 10,
        "required_points": 160
    },
    {
        "id": "d635c003-fffc-4beb-87b8-eaf3458cf552",
        "name": "Luxury Single Room",
        "available_amount": 5,
        "required_points": 800
    }
];