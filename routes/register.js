const express = require('express')
const pool = require('../db')
const router = express.Router()
const {body, validationResult} = require('express-validator')

const jwtGenerator = require('../utils/jwtgenerator')



router.post('/api/register', 
body('player_name').not().isEmpty().withMessage('name cant be empty'),
    async (req, res) => {
    try {

        const errors =  validationResult(req)

        if(!errors.isEmpty()) {
            console.log(errors.errors[0].msg)
            return res.status(400).json(errors.errors[0].msg)
          }

        const {player_name} = req.body
        const player = await pool.query("SELECT * FROM players WHERE player_name = $1", 
        [player_name]
        )

            if(player.rows.length !== 0) {
                return res.status(401).send('player already exist')
            } else {
                const newPlayer = await pool.query("INSERT INTO players (player_name) VALUES($1) RETURNING *",
                    [player_name])
                    
                const token = jwtGenerator(newPlayer.rows[0].player_name)    
                    
                    res.send({token, player_name:  newPlayer.rows[0].player_name})    
            }
    } catch(er) {
        console.error(er.message)
    }
})


module.exports = router