import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat
} from 'graphql';
import Actors from '../../data/Actors'
import Movies from '../../data/Movies'
import ActorType from './ActorType';

const fetch = require('node-fetch');

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  description: 'A blockbuster movie',
  fields:() => ({
    id: {
      type: GraphQLInt,
      description: "The movie id"
    },
    title: {
      type: GraphQLString,
      description: "The movie's title"
    },
    image: {
      type: GraphQLString,
      description: "The movie's cover image url"
    },
    release_year: {
      type: GraphQLInt,
      description: "The movie release date"
    },
    tags: {
      type: new GraphQLList(GraphQLString),
      description: "Movie tags"
    },
    rating: {
      type: GraphQLFloat,
      description: "The movie rating"
    },
    actors: {
      type: new GraphQLList(ActorType),
      resolve: async (movie) => {
        // Original GraphQL Call
        const movieActors = movie.actors.map(actorId => Actors.find(o => o.id === actorId))
        return movieActors;


        // Connect to Existing REST API
        /*
        const actorsRes = await fetch(movie.actors);
        const actorsRef = await actorsRes.json();

        let actors = actorsRef.map(async (actorRef) => {
          const actorRes = await fetch(actorRef);
          return await actorRes.json();
        });

        await Promise.all(actors).then((completed) => {
          actors = completed;
        });

        return actors;
        */

      }
    }
  }),
});

export default MovieType;
