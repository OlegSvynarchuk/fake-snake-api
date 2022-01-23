const express = require('express')
const router = express.Router()

const authorization = require('../middleware/authorization')



router.get('/api/verifyplayer', authorization,  async(req, res) => {
    try {
                 
            res.json({isVerified: true, player_name: req.player})
    } catch (error) {
        console.error(error.message)
    }
    
})

module.exports = router;