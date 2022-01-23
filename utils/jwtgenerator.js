const jwt = require('jsonwebtoken')
require('dotenv').config()


function jwtGenerator(player_id) {
    const payload = {
        player: player_id
    }
  return   jwt.sign(payload, process.env.JWT_SECRET)
}

module.exports = jwtGenerator 