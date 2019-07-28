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
//Simple Query GET : http://localhost:4000/rooms?query={room(id: "d635c003-fffc-4beb-87b8-eaf3458cf442"){id,name}}
/*
mutation{createUser(id: "abc1-548c-4739-8e6a-0931cc218cd1",
        name: "Arun",
        role: "ADMIN",
        bonus_point: 5000){id,name,role,bonus_point}}
*/
//mutation{createUser(id:"454647",name:"raghav",role:"USER",bonus_point:1000){id,name,role,bonus_point}}
//mutation{editBonus(id:454647,bonus_point:-100){id,name,role,bonus_point}}