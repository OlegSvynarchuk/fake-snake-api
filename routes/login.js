const express = require('express')
const pool = require('../db')
const router = express.Router()
const {body, validationResult} = require('express-validator')

const jwtGenerator = require('../utils/jwtgenerator')



router.post('/api/login', [
    body('player_name').not().isEmpty().withMessage('name cant be empty')
], async (req, res) => {
    try {
        const errors =  validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json(errors.errors[0].msg)
          }

        const {player_name} = req.body
        const player = await pool.query("SELECT * FROM players WHERE player_name = $1", 
        [player_name]
        )

            if(player.rows.length === 0) {
                return res.status(403).send('player doesn\'t exist')
            } else {
               const token = jwtGenerator(player_name)    
                    res.send({token, player_name})    
            }
    } catch(er) {
        
    }
})


module.exports = router