const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');
const path = require('path');
const schema = fs.readFileSync(path.resolve(__dirname, './graphQLSchemas/room.schema'), 'utf8');
const roomSchema = buildSchema(schema);
const { Resolvers } = require('./graphQLResolvers/room.js');
const { Mutations } = require('./graphQLMutations/room.js');
var app = express();
const resolvers = new Resolvers();
const mutations = new Mutations();
app.use('/rooms', express_graphql({
    schema: roomSchema,
    rootValue: {...resolvers, ...mutations },
    graphiql: true
}));
app.listen(4000, () => console.log('Room service running On localhost:4000'));

//sample requests
//Mutation POST : http://localhost:4000/rooms?query=mutation {createRoom(id: 7, name:"Arun") {name,id}}
//Simple Query GET : http://localhost:4000/rooms?query={room(id: "d635c003-fffc-4beb-87b8-eaf3458cf442"){id,name}}