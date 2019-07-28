const { DataAccessLayer } = require('../sdk/db/dataAccessLayer.js');
const { Queue } = require('../sdk/messageBroker/rabbitmq.js');
let dataAccessLayer = new DataAccessLayer();

class Mutations {

    constructor(dbLayer = dataAccessLayer) {
        this.dataAccessLayer = dbLayer;
        this.createRoom = this.createRoomMutation;
        this.editRoom = this.editRoomMutation;
        this.removeRoom = this.removeRoomMutation;
    }
    async createRoomMutation(args, context) {
        let res = await dataAccessLayer.saveDoc(args);
        return res;
    }

    async editRoomMutation(args, context) {
        let res = await dataAccessLayer.editDoc(args);
        if (res.available_amount == 0) {
            Queue.publish({ topic: "room_availability", id: res.id, available_amount: 0 });
        }
        return res;
    }

    async removeRoomMutation(args, context) {
        let res = await dataAccessLayer.removeDoc(args);
        Queue.publish({ topic: "room_availability", id: res.id, available_amount: 0 });
        return res;
    }
}

module.exports = {
    Mutations
}