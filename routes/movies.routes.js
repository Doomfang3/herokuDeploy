const router = require('express').Router()
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

router.get('/', async (req, res) => {
  try {
    const allMovies = await Movie.find()
    res.render('movies/movies', { allMovies })
  } catch (error) {
    console.log('Error listing movies', error)
  }
})

router.get('/movie-details/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id).populate('cast')
  console.log(movie)
  res.render('movies/movie-details', { movie })
})

router.get('/create', async (req, res) => {
  const celebs = await Celebrity.find()
  res.render('movies/new-movie', { celebs })
})

router.post('/create', async (req, res) => {
  try {
    await Movie.create(req.body)
    res.redirect('/movies')
  } catch (error) {
    console.log('Error creating movie: ', error)
    res.redirect('/movies/create')
  }
})

router.get('/edit/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id)
  const celebs = await Celebrity.find()
  res.render('movies/edit-movie', { movie, celebs })
})

router.post('/edit/:id', async (req, res) => {
  await Movie.findByIdAndUpdate(req.params.id, req.body)
  res.redirect(`/movies/movie-details/${req.params.id}`)
})

router.post('/delete/:id', async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id)
    res.redirect('/movies')
  } catch (error) {
    console.log('Error Deleting Movie', error)
  }
})

module.exports = router
