const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');
const path = require('path');
const schema = fs.readFileSync(path.resolve(__dirname, './graphQLSchemas/user.schema'), 'utf8');
const userSchema = buildSchema(schema);
const { Resolvers } = require('./graphQLResolvers/user.js');
const { Mutations } = require('./graphQLMutations/user.js');
var app = express();
const resolvers = new Resolvers();
const mutations = new Mutations();
app.use('/users', express_graphql({
    schema: userSchema,
    rootValue: {...resolvers, ...mutations },
    graphiql: true
}));
app.listen(4001, () => console.log('User service running On localhost:4001'));

//sample requests
//Mutation POST : http://localhost:4000/rooms?query=mutation {createRoom(id: 7, name:"Arun") {name,id}}
//Simple Query GET : http://localhost:4000/rooms?query={room(id: "d635c003-fffc-4beb-87b8-eaf3458cf442"){id,name}}
/*
mutation{createUser(id: "abc1-548c-4739-8e6a-0931cc218cd1",
        name: "Arun",
        role: "ADMIN",
        bonus_point: 5000){id,name,role,bonus_point}}
*/