const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');

//testing queue.
let { Queue } = require('./sdk/messageBroker/rabbitmq.js');
const fs = require('fs');
const path = require('path');
const schema = fs.readFileSync(path.resolve(__dirname, './graphQLSchemas/booking.schema'), 'utf8');
const bookingSchema = buildSchema(schema);
const { Resolvers } = require('./graphQLResolvers/booking.js');
const { Mutations } = require('./graphQLMutations/booking.js');
var app = express();
const resolvers = new Resolvers();
const mutations = new Mutations();
app.use('/bookings', express_graphql({
    schema: bookingSchema,
    rootValue: {...resolvers, ...mutations },
    graphiql: true
}));
app.listen(4002, () => console.log('booking service running On localhost:4002'));
Queue.consume(); //start consumer
//sample requests
//Mutation POST : http://localhost:4000/bookings?query=mutation {createbooking(id: 7, name:"Arun") {name,id}}
//Simple Query GET : http://localhost:4000/bookings?query={booking(id: "d635c003-fffc-4beb-87b8-eaf3458cf442"){id,name}}
//id:"123",user_id:"jdhdhd",status:BOOKED,room_id:"456"