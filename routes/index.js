const router = require('express').Router();
const APIRoutes = require('./api');

router.use('/api', APIRoutes);

router.use((req, res) => {
    res.status(404).send('<h1> Wrong Route! 404 Error! <h1>')
});

module.exports = router;