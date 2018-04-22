const { GraphQLServer } = require('graphql-yoga');

const movies = [
  {
    id: 'movie01',
    title: 'Matrix',

  },
  {
    id: 'mvoie02',
    title: 'Matrix Reloaded',
  }, 
  {
    id: 'movie03',
    title: 'Matrix Revolutions',
  },
];

const resolvers = {
  Query: {
    allMovies: (root, args, context) => {
      return movies;
    },
  }
};

const server = new GraphQLServer({
  typeDefs: 'schema/schema.graphql',
  resolvers,
});

server.start(() => console.log("GraphQLServer running on http://localhost:4000"));