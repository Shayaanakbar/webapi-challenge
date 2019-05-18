const express = require('express')
const router = express.Router();
const dbs = require('./actionModel');
router.use(express.json());

router.get('/', (req, res) =>{
  dbs.get()
    .then( project => {
      res.status(200).json(project)
    })
    .catch( error => {
      res.status(500).json({error:{message: " something"}})
    })
})



module.exports = router;