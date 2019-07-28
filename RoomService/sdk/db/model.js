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

class SchemaValidation {
    static nameValidator(attributeName, ifUnique = false) {
        return {
            type: String,
            unique: ifUnique,
            validate: {
                validator: function(v) {
                    return /^[a-zA-Z0-9_-]{3,20}$/.test(v);
                },
                message: props => `${props.value} is not a valid ${attributeName}`
            }
        }
    }

    static idValidator(attributeName, ifUnique = false) {
        return {
            type: String,
            unique: ifUnique,
            validate: {
                validator: function(v) {
                    return /^[a-zA-Z0-9@._-]{3,20}$/.test(v);
                },
                message: props => `${props.value} is not a valid ${attributeName}`
            }
        }
    }

    static numberValidator(attributeName, defaultValue = 0) {
        return {
            type: Number,
            min: [0, 'has to be positive'],
            max: [1000000, 'exceeded maximum value'],
            default: defaultValue
        }
    }
}
class Schemas {
    static getRoomSchema(db) {
        return new db.Schema({
            name: SchemaValidation.nameValidator("name"),
            id: SchemaValidation.idValidator("id", true),
            available_amount: SchemaValidation.numberValidator("available_amount"),
            required_points: SchemaValidation.numberValidator("required_points"),
        });
    }
}
module.exports = { Models }