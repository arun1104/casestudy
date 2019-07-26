const { DataAccessLayer } = require('../sdk/db/dataAccessLayer.js');
let dataAccessLayer = new DataAccessLayer();

class Resolvers {
    constructor(dbLayer = dataAccessLayer) {
        this.dataAccessLayer = dbLayer;
        this.room = this.roomResolver;
        this.roomsResolver = this.roomsResolver;
    }
    async roomResolver(args, context) {
        let res = await this.dataAccessLayer.getDocs(args);
        return res[0];
    }
    async roomsResolver(parent, args, context, info) {
        return this.dataAccessLayer.getDocs({});
    }
}
Resolvers.dataAccessLayer = dataAccessLayer;
module.exports = {
    Resolvers
}