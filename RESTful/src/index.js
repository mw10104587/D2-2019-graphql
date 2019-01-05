import express from 'express';
import cors from 'cors';
import MovieController from './controllers/MovieController';
import ActorController from './controllers/ActorController';
import MoviesAndActorsController from './controllers/MoviesAndActorsController'

const app = express();
app.use(cors());

app.set('json spaces', 2);

app.get('/actors', ActorController.getAll);
app.get('/actor/:id', ActorController.getById);
app.get('/actor/:id/movies', ActorController.getActorMovies)

app.get('/movies', MovieController.getAll);
app.get('/movie/:id', MovieController.getById);
app.get('/movie/:id/actors', MovieController.getMovieActors)

app.get('/moviesAndActors', MoviesAndActorsController.getMoviesAndActors)

app.use(express.static('public'))

const port = process.env.NODE_ENV ? 80 : 3000;

app.listen(port, () => {
  console.log(`app started on port ${port}`);
});
