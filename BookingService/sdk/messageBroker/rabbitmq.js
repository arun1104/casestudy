let amqp = require('amqplib');
let util = require('util');
class RabbitMQ {
    // Publisher
    static async consume() {
        let q = "Booking";
        try {
            let conn = await amqp.connect('amqp://localhost');
            let ch = await conn.createChannel();
            console.log("Consumer is listening on the channel");
            let QRetrieved = await ch.assertQueue(q);
            ch.consume(q, function(msg) {
                if (msg !== null) {
                    console.log("Received message and acknowledged:" + JSON.parse(msg.content.toString()));
                    console.log(JSON.parse(msg.content.toString()));
                    ch.ack(msg);
                }
            });
        } catch (err) {
            console.log("Error on message broker" + util.inspect(err, null));
        }
    }
}
module.exports = { Queue: RabbitMQ }