class Models {
    constructor(mongoose) {
        this.modelMap = {
            "Rooms": mongoose.model('Rooms', Schemas.getRoomSchema(mongoose))
        };
    }
    getModel(type) {
        return this.modelMap[type];
    }
}

class Schemas {
    static getRoomSchema(db) {
        return new db.Schema({
            name: String,
            id: {
                type: String,
                unique: true
            },
            available_amount: {
                type: Number,
                min: [0, 'has to be positive'],
                max: 1000000,
                default: 0
            },
            required_points: {
                type: Number,
                min: [0, 'has to be positive'],
                max: 1000000,
                default: 0
            }
        });
    }
}
module.exports = { Models }