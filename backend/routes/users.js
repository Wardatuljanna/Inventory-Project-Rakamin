const express = require('express')
const verifyToken = require("../middlewares/verify-token")
const router = express.Router()
const userHandler = require('./handlers/users')
const userIdHandler = require('./handlers/users/id')

router.route('/').get(verifyToken, userHandler.get)

router
.route("/:userId")
  .get(userIdHandler.get)
  .put(userIdHandler.put)
  .delete(userIdHandler.delete);

module.exports = router;
