const { DataAccessLayer } = require('../sdk/db/dataAccessLayer.js');
let dataAccessLayer = new DataAccessLayer();

class Mutations {

    constructor(dbLayer = dataAccessLayer) {
        this.dataAccessLayer = dbLayer;
        this.createUser = this.createUserMutation;
        this.editUser = this.editUserMutation;
        this.removeUser = this.removeUserMutation;
        this.editBonus = this.editBonusPointMutation;
    }
    async createUserMutation(args, context) {
        let res = await dataAccessLayer.saveDoc(args);
        return res;
    }

    async editUserMutation(args, context) {
        let res = await dataAccessLayer.editDoc(args);
        return res;
    }

    async removeUserMutation(args, context) {
        let res = await dataAccessLayer.removeDoc(args);
        return res;
    }

    async editBonusPointMutation(args, context) {
        let userDocs = await this.dataAccessLayer.getDocs({ id: args.id });
        let newBonusPoint = userDocs[0].bonus_point;
        if (args.bonus_point) {
            newBonusPoint = newBonusPoint + args.bonus_point;
        }
        let res = await dataAccessLayer.editDoc({ id: args.id, bonus_point: newBonusPoint });
        return res;
    }

    async removeUserMutation(args, context) {
        let res = await dataAccessLayer.removeDoc(args);
        return res;
    }
}

module.exports = {
    Mutations
}