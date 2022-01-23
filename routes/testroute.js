const express = require('express')

const router = express.Router()


router.get('/api/testroute' , (req, res) => {
    return res.send('api works')
})

module.exports = router;