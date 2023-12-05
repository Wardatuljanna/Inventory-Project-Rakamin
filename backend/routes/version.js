const express = require('express')
const verifyToken = require("../middlewares/verify-token")
const router = express.Router()
const versionHandler = require('./handlers/versions')
const versionIdHandler = require('./handlers/versions/id')

router.route('/')
    .get(verifyToken, versionHandler.get)
router
.route("/:versionId")
  .get(versionIdHandler.get)

module.exports = router;