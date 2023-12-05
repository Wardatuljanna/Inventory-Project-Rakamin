const express = require('express')
const verifyToken = require("../middlewares/verify-token")
const router = express.Router()
const productHandler = require('./handlers/products')
const productIdHandler = require('./handlers/products/id')

router.route('/')
    .get(verifyToken, productHandler.get)
    .post(verifyToken, productHandler.post)

router
.route("/:productId")
  .get(verifyToken, productIdHandler.get)
  .put(verifyToken, productIdHandler.put)
  .delete(verifyToken, productIdHandler.delete);

module.exports = router;

