// importing Modules
const express = require("express");
const router = express.Router();

// importing files
const Todo = require("../model/Todo");

//////////////////////POST method
router.post("/", async (req, res) => {
  const { subject, desc, priority, addTo, date } = req.body;
  try {
    todo = new Todo({
      subject,
      desc,
      priority,
      addTo,
      date
    });

    await todo.save();

    res.send('user saved"');
  } catch (error) {
    console.error(error.message);
    res.statue(500).send("Server error");
  }
});

/////////////////////GET all method
router.get("/", async (req, res) => {
  try {
    await Todo.find((err, todos) => {
      if (err) {
        console.log(err);
      } else {
        res.json(todos);
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

/////////////////////////////GET by ID
router.get("/:id", async (req, res) => {
  try {
    await Todo.findById(req.params.id, (err, todo) => {
      res.json(todo);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

/////////////////////////////////UPDATE by ID

router.put("/update/:id", async (req, res) => {
  try {
    Todo.findById(req.params.id, (err, todo) => {
      if (!todo) {
        res.status(404).send("data is not found");
      } else {
        (todo.subject = req.body.subject),
          (todo.desc = req.body.desc),
          (todo.priority = req.body.priority),
          (todo.addTo = req.body.addTo);

        todo
          .save()
          .then(todo => {
            res.json("Todo updated");
          })
          .catch(err => {
            res.status(400).send("Update not done");
          });
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

/////////////////////////////////Delete by ID
router.delete("/:id", (req, res) => {
  Todo.findByIdAndRemove(req.params.id, (err, todo) => {
    if (!err) {
      res.status(200).json({ msg: "Removed from database" });
    }
  });
});

module.exports = router;
