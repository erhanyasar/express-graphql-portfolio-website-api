const express = require("express");
const bodyParser = require("body-parser");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const serverless = require("serverless-http");

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
  } = require("graphql");

const app = express();
module.exports.handler = serverless(app);

app.use(bodyParser.json());

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "HelloWorld",
    fields: () => ({
    message: {
        type: GraphQLString,
        resolve: () => "Hello World",
    },
    }),
  }),
});

app.use(
  "/",
  expressGraphQL({
    schema: schema,
    graphiql: true
  })
);