const router = require('express').Router();
const apiRoutes = require('./api');
// Route setup
router.use('/api', apiRoutes);
// 404 Error
router.use((req, res) => {
  res.status(404).send('<h1>API Route doesn\'t Exist::404 Error</h1>');
});
module.exports = router;