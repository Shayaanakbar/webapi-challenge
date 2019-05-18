const express = require('express')
const router = express.Router();
const db = require('./data/helpers/projectModel')
router.use(express.json())

router.get('/', (req, res) =>{
  db.get()
    .then( project => {
      res.status(200).json(project)
    })
    .catch( error => {
      res.status(500).json({error:{message: " something"}})
    })
})

module.exports = router;