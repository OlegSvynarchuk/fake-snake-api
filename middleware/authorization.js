const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async (req, res, next) => {
    try {
      const jwtToken = req.header('token')
      
      if(!jwtToken) {
          return res.status(403).json('you are not authorized')
      }  
      const payLoad = jwt.verify(jwtToken, process.env.JWT_SECRET)
      
      req.player = payLoad.player 
      
      next()
    } catch (error) {
        console.error(error.message)
        return res.status(403).json('you are not authorized')
    }
}