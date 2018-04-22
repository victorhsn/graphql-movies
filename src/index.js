const { GraphQLServer } = require('graphql-yoga');
const movies = require('./data/movies');
const studios = require('./data/studios');

const resolvers = {
  Query: {
    allMovies: (root, args, context) => {
      return movies;
    },
  },
  Movie: {
    studio: (root, args, context) => {
      return studios.find(studio => {
        return studio.movieIds.find(movieId => movieId === root.id);
      })
    },
  } 
};

const server = new GraphQLServer({
  typeDefs: './schema/schema.graphql',
  resolvers,
});

server.start(() => console.log("GraphQLServer running on http://localhost:4000"));