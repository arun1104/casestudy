class Models {
    constructor(mongoose) {
        this.modelMap = {
            "Bookings": mongoose.model('Bookings', Schemas.getBookingschema(mongoose))
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
}
class Schemas {
    static getBookingschema(db) {
        return new db.Schema({
            id: SchemaValidation.idValidator("id", true),
            user_id: SchemaValidation.idValidator("user_id"),
            user_name: SchemaValidation.nameValidator("user_name"),
            room_id: SchemaValidation.nameValidator("room_id"),
            room_name: SchemaValidation.nameValidator("room_name"),
            status: {
                type: String,
                enum: ['BOOKED', 'PENDING', 'CANCELLED'],
            }
        });
    }
}
module.exports = { Models }