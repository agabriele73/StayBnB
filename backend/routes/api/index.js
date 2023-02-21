// backend/routes/api/index.js
// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./user');
const spotsRouter = require('./spots')
const reviewsRouter = require('./reviews')
const spotImagesRouter = require('./spot-images')
const { restoreUser, setTokenCookie } = require("../../utils/auth");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewsRouter);

router.use('/spot-images', spotImagesRouter);


// backend/routes/api/index.js
// ...

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });
  
  // ...




router.use(restoreUser)

// ...
module.exports = router;