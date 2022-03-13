import asyncHandler from 'express-async-handler'
import ToDo from '../models/toDoModel.js'

// @desc    Create To Do
// @route   POST /api/todo
// @access  Private
const createToDo = asyncHandler(async (req, res) => {
  const { title, description } = req.body
  console.log(req.body)

  if (!title) {
    res.status(400)
    throw new Error('Invalid To Do data. Title is a required field')
  }

  const toDo = await ToDo.create({
    createdBy: req.user._id,
    title,
    description,
  })

  if (toDo) {
    res.json(toDo)
  } else {
    res.status(401)
    throw new Error('Invalid To Do data')
  }
})

// @desc    Get all To Dos
// @route   GET /api/todo
// @access  Private
const getAllToDos = asyncHandler(async (req, res) => {
  
  const pageSize = 5
  const page = Number(req.query.pageNumber) || 1

  const toDos = await toDo.find({ createdBy: req.user._id })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  const count = await toDo.countDocuments({})    
  res.json({ toDos, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Get toDo
// @route   GET /api/todo/:id
// @access  Private
const getToDoById = asyncHandler(async (req, res) => {
  const toDo = await toDo.findById(req.params.id)

  if (toDo) {
    res.json(toDo)
  } else {
    res.status(404)
    throw new Error('To Do not found')
  }
})

// @desc    Delete To Do
// @route   DELETE /api/todo/:id
// @access  Private
const deleteToDo = asyncHandler(async (req, res) => {
  const isToDoDeleted = await toDo.deleteOne(
    { createdBy: req.user._id, _id: req.params.id },
    {
      useFindAndModify: false,
    }
  );

  if (isToDoDeleted) {
    res.json({
      message: "To Do deleted successfully",
    });
  } else {
    res.status(404);
    throw new Error("To Do not found");
  }
})

// @desc    Update To Do
// @route   PATCH /api/todo/:id
// @access  Private
const updateToDo = asyncHandler(async (req, res) => {

  const { title, description } = req.body;

  if (!title) {
    res.status(400)
    throw new Error('Invalid to Do data. Title is required')
  }
  
  const toDo = await toDo.findOneAndUpdate(
    { createdBy: req.user._id, _id: req.params.id },
    req.body,
    {
      new: true,
      useFindAndModify: false,
    }
  );

  if (toDo) {
    res.json(toDo);
  } else {
    res.status(404);
    throw new Error("To Do not found");
  }
})

export {
  createToDo,
  getToDoById,
  getAllToDos,
  deleteToDo,
  updateToDo
}
