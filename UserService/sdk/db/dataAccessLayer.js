var uuid = require('uuid');
var mongoose = require("mongoose");
const { Models } = require('./model.js');
let dbModels = new Models(mongoose);
class DataAccessLayer {
    constructor(db = mongoose, models = dbModels, collectionName = "Users", dbHost = 'mongodb://localhost:27017/') {
        this.mongoose = db;
        this.dbHost = dbHost;
        this.collection = collectionName;
        this.dbUrl = this.dbHost + this.collection;
        this.models = models;
    }
    async getDocs(query) {
        try {
            let con = await this.mongoose.connect(this.dbUrl, { useNewUrlParser: true });
            const RoomModel = this.models.getModel("Users");
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
            const RoomModel = this.models.getModel("Users");
            let room = req;
            let roomDocument = new RoomModel(req);
            let newRoomDoc = await roomDocument.save();
            return newRoomDoc;
        } catch (error) {
            console.log("Error on save docs of DB");
            return [];
        }
    }
    async editDoc(req) {
        try {
            await this.mongoose.connect(this.dbUrl, { useNewUrlParser: true });
            const RoomModel = this.models.getModel("Users");
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
            const RoomModel = this.models.getModel("Users");
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
        "id": "abc1-548c-4739-8e6a-0931cc218cd1",
        "name": "Arun",
        "role": "ADMIN",
        "bonus_points": 5000
    },
    {
        "id": "hydg-548c-4739-8e6a-0931cc218cd1",
        "name": "Nathan",
        "role": "USER",
        "bonus_points": 200
    },
    {
        "id": "jshs-6a-0931cc218cd1",
        "name": "Jane Doe",
        "role": "USER",
        "bonus_points": 900
    },
    {
        "id": "b9fa7d71-9ikj-931cc218cd1",
        "name": "Heramba",
        "bonus_points": 150
    }
];