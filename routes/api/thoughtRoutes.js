const router = require('express').Router();

const {
    getAllThoughts,
    thoughtCreation,
    getThoughtID,
    updateThoughtID,
    deleteThoughtID,
    createReaction,
    eraseReaction
} = require('../../controllers/thoughtController');

router
    .route('/')
    .get(getAllThoughts)
    .post(thoughtCreation);

router
    .route('/:id')
    .get(getThoughtID)
    .put(updateThoughtID)
    .delete(deleteThoughtID);

router
  .route('/:thoughtId/reaction')
  .post(createReaction);

router
  .route('/:thoughtId/reaction/:reactionId')
  .delete(eraseReaction);

module.exports = router;