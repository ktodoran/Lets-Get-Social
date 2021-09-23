const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    giveFriend,
    eraseFriend
} = require ('../../controllers/userController');

router
    .route('/')
    .get(getAllUser)
    .post(createUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);


router
    .route('/:id/friends/:friendsId')
    .post(giveFriend)
    .delete(eraseFriend);

module.exports = router;