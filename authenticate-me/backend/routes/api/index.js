// backend/routes/api/index.js
const router = require('express').Router();

const { setTokenCookie, restoreUser } = require('../../utils/auth.js');
const { User } = require('../../db/models');



// backend/routes/api/index.js
// ...

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });
  
  // ...



  // backend/routes/api/index.js
// ...

// GET /api/set-token-cookie
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
  setTokenCookie(res, user);
  return res.json({ user: user });
});
router.use(restoreUser)

// ...
module.exports = router;