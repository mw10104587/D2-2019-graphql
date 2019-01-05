import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} from 'graphql';
import Movies from '../../data/Movies'
import MovieType from './MovieType';

const ActorType = new GraphQLObjectType({
  name: 'Actor',
  description: 'A movie star',
  fields:() => ({
    id: {
      type: GraphQLInt,
      description: "The actor id"
    },
    name: {
      type: GraphQLString,
      description: "The actor's name"
    },
    image: {
      type: GraphQLString,
      description: "The actor's cover image url"
    },
    dob: {
      type: GraphQLString,
      description: "The actor's dob"
    },
    num_credits: {
      type: GraphQLInt,
      description: "The number of movies in which this actor has acted"
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve: (actor) => {
        const actorMovies = Movies.filter(
          movie => movie.actors.includes(actor.id)
        );
        return actorMovies;
      }
    }
  }),
});

export default ActorType;