const { GraphQLServer } = require('graphql-yoga');
const path = require('path');
const {movies, studios, casts } = require('./data/data');

let movieIndex = movies.length;

const resolvers = {
  Query: {
    allMovies: (root, args, context) => {
      return movies;
    },
  },
  Mutation: {
    createMovie: (root, args, context) => {
      const newMovie = {
        id: `movie${movieIndex++}`,
        ...args,
      };

      movies.push(newMovie);

      return newMovie;
    },
  },
  Movie: {
    studio: (root, args, context) => {
      return studios.find(studio => {
        return studio.movieIds.find(movieId => movieId === root.id);
      });
    },
    cast: (root, args, context) => {
      return casts.find(cast => {
        return cast.moviesId.find(movieId => movieId === root.id);
      });
      
    }
  },
};

const server = new GraphQLServer({
  typeDefs: __dirname + '/schema/schema.graphql',
  resolvers,
});

server.start(() => console.log("GraphQLServer running on http://localhost:4000"));