const { DataAccessLayer } = require('../sdk/db/dataAccessLayer.js');
let dataAccessLayer = new DataAccessLayer();

class Resolvers {
    constructor(dbLayer = dataAccessLayer) {
        this.dataAccessLayer = dbLayer;
        this.user = this.userResolver;
        this.users = this.usersResolver;
    }
    async userResolver(args, context) {
        let res = await this.dataAccessLayer.getDocs(args);
        return res[0];
    }
    async usersResolver(parent, args, context, info) {
        let res = await this.dataAccessLayer.getDocs({});
        return res;
    }
}
Resolvers.dataAccessLayer = dataAccessLayer;
module.exports = {
    Resolvers
}