const express = require('express')
const router = express.Router()
const pool = require('../db')





router.get('/api/gettopscores',  async(req, res) => {
    try {
        const topScores = await pool.query("SELECT player_name, score FROM players ORDER BY score DESC LIMIT 5" 
    )     
            res.json({topScores: topScores.rows})
    } catch (error) {
        console.error(error.message)
    }
    
})

module.exports = router;