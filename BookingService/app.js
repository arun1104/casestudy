const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');
const roomSchema = fs.readFileSync('./grapQLSchemas/transaction.schema');
// GraphQL schema
var schema = buildSchema(`
    type Query {
        message: String
    }
`);

// GraphQL schema
var schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    },
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

// Root resolver
var root = {
    message: () => 'Hello World!'
};
//Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Boooking service running On localhost:4000/graphql'));