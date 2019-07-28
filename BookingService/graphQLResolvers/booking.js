const { DataAccessLayer } = require('../sdk/db/dataAccessLayer.js');
let dataAccessLayer = new DataAccessLayer();

class Resolvers {
    constructor(dbLayer = dataAccessLayer) {
        this.dataAccessLayer = dbLayer;
        this.booking = this.bookingResolver;
        this.bookings = this.bookingsResolver;
    }
    async bookingResolver(args, context) {
        let res = await this.dataAccessLayer.getDocs(args);
        return res[0];
    }
    async bookingsResolver(parent, args, context, info) {
        let res = await this.dataAccessLayer.getDocs({});
        return res;
    }
}
Resolvers.dataAccessLayer = dataAccessLayer;
module.exports = {
    Resolvers
}