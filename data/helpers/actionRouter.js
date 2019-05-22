const express = require('express')
const router = express.Router();
const dbaction = require('./actionModel');
router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const allActions = await dbaction.get();
    res.json({ message: allActions });
  } catch (err) {
    res.status(500).json({ message: "Error: server conflict" });
  }
});

router.post("/", async (req, res) => {
  try {
    const validateProject = await dbaction.get(req.body.project_id);

    if (validateProject) {
      const newAction = await dbaction.insert(req.body);
      res.json({ message: newAction });
    } else {
      res.status(404).json({ message: "Invalid project id" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error: server conflict" });
  }
});


router.put('/:id', (req, res) => {
  const updateAct = req.body
  const id = req.params.id

  dbaction.update(id, updateAct)
    .then( action => {
      res.status(200).json(action)
    })
    .catch( err => {
      res.status(500).json({ error: err, message:"Could not update data"})
    })

})

router.delete('/:id', (req, res)=>{
  const actionid = req.params.id
  dbaction.remove(actionid)
    .then( action =>{
      if(action){
        dbaction.remove(actionid).then(
          removeaction => {
            res.status(201).json(removeaction)
          }
        )
      }else{
        res.status(404).json({ error: err, mesage : "User does not exist"})
      }
    })
    .catch(error =>{
      res.status(500).json({  message: "User not be removed"})
    })
})


module.exports = router;
