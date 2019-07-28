let amqp = require('amqplib');
let util = require('util');
class RabbitMQ {
    // Publisher
    static async publish(data = 'something to do') {
        let q = "Booking";
        try {
            let conn = await amqp.connect('amqp://localhost');
            let ch = await conn.createChannel();
            let QRetrieved = await ch.assertQueue(q);
            let res = await ch.sendToQueue(q, Buffer.from(data));
            return res;
        } catch (err) {
            console.log("Error on message broker" + util.inspect(err, null))
        }
    }
}
module.exports = { Queue: RabbitMQ }