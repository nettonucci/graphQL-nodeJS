const {GraphQLScalarType} = require('graphql');

const userResolvers = {
    DateTime: new GraphQLScalarType({ 
        name: 'DateTime', 
        description: 'String de data e hora no formate ISO-8601', 
        serialize: (value) => value.toISOString, 
        parseValue: (value) => new Date(value), 
        parseLiteral: (ast) => new Date(ast.value) 
    }),
    Query: {
        users: (root, args, {dataSources}) => dataSources.usersAPI.getUsers(),
        user: (root, args, {dataSources}) => dataSources.usersAPI.getUserById(args.id)
    },
    Mutation: {
        adicionaUser: async (root, {user}, {dataSources}) => dataSources.usersAPI.adicionaUser(user),
        atualizaUser: async (root, novosDados, {dataSources}) => dataSources.usersAPI.atualizaUser(novosDados),
        deletaUser: async (root, {id}, {dataSources}) => dataSources.usersAPI.deletaUser(id)
    }
}

module.exports = userResolvers