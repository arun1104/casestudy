const { DataAccessLayer } = require('../sdk/db/dataAccessLayer.js');
let dataAccessLayer = new DataAccessLayer();

class Mutations {

    constructor(dbLayer = dataAccessLayer) {
        this.dataAccessLayer = dbLayer;
        this.newBooking = this.createBookingMutation;
        this.editBooking = this.editBookingMutation;
        this.removeBooking = this.removeBookingMutation;
    }
    async createBookingMutation(args, context) {
        let res = await dataAccessLayer.saveDoc(args);
        return res;
    }

    async editBookingMutation(args, context) {
        let res = await dataAccessLayer.editDoc(args);
        return res;
    }

    async removeBookingMutation(args, context) {
        let res = await dataAccessLayer.removeDoc(args);
        return res;
    }
}

module.exports = {
    Mutations
}