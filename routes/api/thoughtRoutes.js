const router = require('express').Router();

const {
    getAllThoughts,
    createThought,
    getThoughtById,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController');

router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router
  .route('/:thoughtId/reaction')
  .post(addReaction);

router
  .route('/:thoughtId/reaction/:reactionId')
  .delete(removeReaction);

module.exports = router;