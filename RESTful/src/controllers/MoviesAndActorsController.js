import Movies from '../../data/Movies'
import Actors from '../../data/Actors'
import { toLink } from '../utilities/toLink'

function toMovieResource(req, movie) {
  const href = toLink(req, 'movie', movie.id)
  return {
    ...movie,
    actors: movie.actors.map(actorId => {
      const actor = Actors.find(o => o.id === actorId)
      return toActorResource(req, actor)
    }),
    href
  }
}

function toActorResource(req, actor) {
  const href = toLink(req, 'actor', actor.id)
  return {
    ...actor,
    href,
    movies: `${href}/movies`
  }
}

class MoviesAndActorsController {
  getMoviesAndActors(req, res) {
    console.log('[getMoviesAndActors]')
    const movies = Movies.map(movie => toMovieResource(req, movie))
    res.send(movies)
  }
}

const controller = new MoviesAndActorsController()
export default controller
