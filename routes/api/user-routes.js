const router = require('express').Router();
// Controller for /api/users API
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addToFriendList,
  removefromFriendList
} = require('../../controllers/user-controller');
// API route for users -- /api/users/
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);
// API route for users by id -- /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);
// API for friend using userId and friendId -- /api/users/:userId/friends/:friendId
router
  .route('/:userId/friends/:friendId')
  .post(addToFriendList);
router
  .route('/:userId/friends/:friendId')
  .delete(removefromFriendList);
module.exports = router;