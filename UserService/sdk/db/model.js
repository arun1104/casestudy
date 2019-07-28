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
    static getUserschema(db) {
        return new db.Schema({
            name: SchemaValidation.nameValidator("name"),
            id: SchemaValidation.idValidator("id", true),
            role: {
                type: String,
                enum: ['USER', 'ADMIN', 'APP_USER'],
            },
            bonus_point: SchemaValidation.numberValidator("bonus_point")
        });
    }
}
module.exports = { Models }