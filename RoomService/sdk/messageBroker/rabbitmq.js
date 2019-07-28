let amqp = require('amqplib');
let util = require('util');
class RabbitMQ {
    // Publisher
    static async publish(data) {
        let q = "Booking";
        try {
            let conn = await amqp.connect('amqp://localhost');
            let ch = await conn.createChannel();
            let QPresent = await ch.assertQueue(q);
            let res = await ch.sendToQueue(q, Buffer.from(JSON.stringify(data)));
            console.log("Room has sent message to Queue");
            setTimeout(function() {
                conn.close();
                console.log('Connection to message broker closed');
            }, 500);
            return res;
        } catch (err) {
            console.log("Error on message broker" + util.inspect(err, null))
        }
    }
}
module.exports = { Queue: RabbitMQ }