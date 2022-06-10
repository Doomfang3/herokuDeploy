const router = require('express').Router()
const Celebrity = require('../models/Celebrity.model')

router.get('/', async (req, res) => {
  try {
    const allCelebrities = await Celebrity.find()
    res.render('celebrities/celebrities', { allCelebrities })
  } catch (error) {
    console.log('error creating new celebrity', error)
  }
})

router.get('/create', (req, res) => {
  res.render('celebrities/new-celebrity')
})

router.post('/create', async (req, res) => {
  try {
    await Celebrity.create(req.body)
    res.redirect('/celebrities')
  } catch (error) {
    res.redirect('/celebrities/create')
    console.log('error ', error)
  }
})

module.exports = router
