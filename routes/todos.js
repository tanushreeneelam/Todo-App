const express = require('express')
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

const router = express.Router()

//Todo Model
const Todo = require('../models/Todo')

// @route Get /todos
// @des Get todos
// @access Private
router.get('/', auth, async (req, res) => {
    try {
      const todos = await Todo.find({ user: req.user.id })
      res.json(todos)

    }catch (err) {
      console.err(err.message)
      res.status(500).send('Server Error')
    }
})


// @route POST /todos
// @des Add new todo
// @access Private
router.post('/',
  [
    auth,
    [
      // check('name', 'Please provide a Name').not().isEmpty()
      // check('phone', 'Please provide the phone number').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() })
    }

    const { name, desc, priority, iscompleted } = req.body

    try {
        // req.user.id is set in middleware/auth.js 
      const newTodo = new Todo({
        user: req.user.id,
        name,
        desc,
        priority,
        iscompleted
      })

      const todo = await newTodo.save()
      res.json(todo)

    } catch (err) {

      console.error(err.message)
      res.status(500).send('Server error')
    }
  })


// @route PUT /todos/:id
// @des update todo
// @access Private

router.put('/:id', auth, async (req, res) => {
    const { name, desc, priority, iscompleted } = req.body
  
    // build todo object 
    const todoFields = { name, desc, priority, iscompleted };
  
    try {
      let todo = await Todo.findById(req.params.id)
      if (!todo) return res.status(404).json({ msg: 'Todo not found' })
      // Make sure user owns the todo
      if (todo.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorised' })
      }
      todo = await Todo.findByIdAndUpdate(req.params.id, { $set: todoFields }, { new: true })
      res.send(todo)
    } catch (err) {
      console.errors(err.message)
      res.status(500).send('Server Error')
    }
})


// @route DELETE /todos/:id
// @des Delete a todo
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try {
      let todo = await Todo.findById(req.params.id)
      if (!todo) return res.status(404).json({ msg: 'Todo not found' })
      // check if user owns the todo 
      if (todo.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorised' })
      }
      await Todo.findByIdAndRemove(req.params.id)
      res.send('Todo Removed successfully')
    } catch (err) {
      console.errors(err.message).json('Server Error')
    }
})

module.exports = router;