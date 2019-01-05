import Movies from '../../data/Movies'
import Actors from '../../data/Actors'
import { toLink } from '../utilities/toLink'

function toMovieResource(req, movie) {
  const href = toLink(req, 'movie', movie.id)
  return {
    ...movie,
    actors: `${href}/actors`,
    href
  }
}

class MovieController {
  getById(req, res) {
    const id = parseInt(req.params.id)
    const movie = toMovieResource(
      req,
      Movies.find(o => o.id === id)
    )

    console.log('[Movie] getById', id);
    res.send(movie)
  }

  getAll(req, res) {
    const movies = Movies.map(movie => ({
      href: toLink(req, 'movie', movie.id)
    }))
    console.log('[Movie] getAll');
    res.send(movies)
  }

  getMovieActors(req, res) {
    const movieId = parseInt(req.params.id);
    const movie = Movies.find(m => m.id === movieId)
    const actorLinks = Actors.filter(
      actor => movie.actors.includes(actor.id)
    ).map(actor => (
      { href: toLink(req, 'actor', actor.id)}
    ));
    console.log('[Movie] getMovieActors');
    res.send(actorLinks)
  }
}

const controller = new MovieController()
export default controller
