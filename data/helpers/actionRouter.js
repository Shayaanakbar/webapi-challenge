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
      res.status(500).json({error:{message: "Error"}});
    })
});

router.post('/', (req, res) => {
  const newRoute = req.body
  dbs.insert(newRoute)
    .then( action => {
      res.status(200).json(action)
    }).catch(error => {
      res.status(500).json({error:{message: "Error"}});
  })
});

router.put('/:id', (req, res) => {
  const updateAction = req.body
  const id = req.params.id

  dbs.update(id, updateAction)
    .then( action => {
      res.status(200).json(action)
    })
    .catch(err => {
      res.status(500).json({ error: err, message: "failed to update"});
    })
});

router.delete('/:id', (req, res) => {
  const actionid = req.params.id
  dbs.remove(actionid)
    .then(action => {
      if(action) {
        dbs.remove(action).then(
          removeaction => {
            res.status(201).json(removeaction)
          }
        )
      } else {
        res.status(404).json({error: err, message: "user w id doesnt exist"});
      }
    })
    .catch(error => {
      res.status(500).json({ message: "the user could not be removed"});
    })
})


module.exports = router;