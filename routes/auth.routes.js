const router = require('express').Router()
const bcryptjs = require('bcryptjs')
const { isLoggedIn, isLoggedOut } = require('../middlewares/route-guard')
const User = require('../models/User.model')

router.get('/signup', (req, res, next) => {
  res.render('auth/signup')
})

router.post('/signup', async (req, res, next) => {
  try {
    const { email, password } = req.body

    const saltRounds = 10

    const salt = await bcryptjs.genSalt(saltRounds)
    const hashedPassword = await bcryptjs.hash(password, salt)
    console.log(`Password hash: ${hashedPassword}`)

    await User.create({ email, passwordHash: hashedPassword })
    res.redirect('/auth/profile')
  } catch (error) {
    if (error.code === 11000) {
      res.render('auth/signup', { errorMessage: 'Email already in use' })
    }
    console.log('error create the post route', error)
  }
})

router.get('/login', isLoggedOut, (req, res, next) => {
  res.render('auth/login')
})

router.post('/login', isLoggedOut, async (req, res, next) => {
  const { email, password } = req.body

  if (email === '' || password === '') {
    res.render('auth/login', { errorMessage: 'please enter email and password' })
    return
  }

  const user = await User.findOne({ email })

  if (!user?.email) {
    res.render('auth/login', { errorMessage: 'This email is not in the DB' })
    return
  }

  if (bcryptjs.compareSync(password, user.passwordHash)) {
    req.session.currentUser = user
    res.redirect('/auth/profile')
  } else {
    // Wrong password
    res.render('auth/login', { errorMessage: 'Wrong password' })
  }
})

router.get('/profile', isLoggedIn, (req, res, next) => {
  res.render('user/profile', { userInSession: req.session.currentUser })
})

module.exports = router
