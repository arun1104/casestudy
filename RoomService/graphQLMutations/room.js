const { DataAccessLayer } = require('../sdk/db/dataAccessLayer.js');
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
        return res;
    }

    async removeRoomMutation(args, context) {
        let res = await dataAccessLayer.removeDoc(args);
        return res;
    }
}

module.exports = {
    Mutations
}