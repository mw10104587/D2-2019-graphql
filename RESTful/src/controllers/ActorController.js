import Movies from '../../data/Movies'
import Actors from '../../data/Actors'
import { toLink } from '../utilities/toLink'

function toActorResource(req, actor) {
  const href = toLink(req, 'actor', actor.id)
  return {
    ...actor,
    href,
    movies: `${href}/movies`
  }
}

class ActorController {
  getById(req, res) {
    const id = parseInt(req.params.id)
    const actor = toActorResource(
      req,
      Actors.find(o => o.id === id)
    )
    console.log('[Actor] getById', id);
    res.send(actor)
  }

  getAll(req, res) {
    const actors = Actors.map(actor => ({
      href: toLink(req, 'actor', actor.id)
    }))
    console.log('[Actor] getAll');
    res.send(actors)
  }

  getActorMovies(req, res) {
    const actorId = parseInt(req.params.id);
    const movies = Movies.filter(m => m.actors.includes(actorId))
    const movieLinks = movies.map(movie => ({ href: toLink(req, 'movie', movie.id) }))
    console.log('[Actor] getActorMovies');
    res.send(movieLinks)
  }
}

const controller = new ActorController()
export default controller
