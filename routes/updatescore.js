const express = require('express')
const pool = require('../db')

const router = express.Router()





router.put('/api/updatescore',  async (req, res) => {
    try {
       
        const {score, player_name} =  req.body
        const oldScore = await pool.query("SELECT *  FROM players WHERE player_name = $1", 
        [player_name]   
        )
        
        if(score > oldScore.rows[0].score) {
            const newScore = await pool.query("UPDATE players SET score = $1 WHERE player_name = $2 RETURNING *", 
                                         [score, player_name]   
        )   
            
              return  res.status(201).send(newScore)
        }
        
        res.send(null)
             
            } catch (err) {
                res.send(err.message)
            }
   
})


module.exports = router