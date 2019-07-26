const { DataAccessLayer } = require('../sdk/db/dataAccessLayer.js');
let dataAccessLayer = new DataAccessLayer();

class Mutations {

    constructor(dbLayer = dataAccessLayer) {
        this.dataAccessLayer = dbLayer;
        this.createRoom = this.createRoomMutation;
    }
    async createRoomMutation(args, context) {
        let res = await dataAccessLayer.saveDoc(args);
        return res;
    }
}

module.exports = {
    Mutations
}