const router = require('express').Router();
// Controller for /api/thoughts API
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-controller');

// API route for thoughts -- /api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(addThought);

// API route for thought by thoughtID -- /api/thoughts/:thoughtID
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought);

// API route for reaction by thoughtID -- /api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction)

// API route for reaction by thoughtID+reactionID -- /api/thoughts/:thoughtId/reactions/:reactionId
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction)

module.exports = router;