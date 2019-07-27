class Models {
    constructor(mongoose) {
        this.modelMap = {
            "Users": mongoose.model('Users', Schemas.getUserschema(mongoose))
        };
    }
    getModel(type) {
        return this.modelMap[type];
    }
}

class Schemas {
    static getUserschema(db) {
        return new db.Schema({
            name: String,
            id: {
                type: String,
                unique: true
            },
            role: {
                type: String,
                default: 'USER'
            },
            bonus_point: {
                type: Number,
                min: [0, 'has to be positive'],
                max: 1000000,
                default: 0
            }
        });
    }
}
module.exports = { Models }