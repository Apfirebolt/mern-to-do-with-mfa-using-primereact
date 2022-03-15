import express from 'express'
const router = express.Router()
import {
  createToDo,
  updateToDo,
  deleteToDo,
  getToDoById,
  getAllToDos,
} from '../controllers/toDoController.js'
import { protect } from '../middleware/authMiddleware.js'

router
  .route('/')
  .post(protect, createToDo)
  .get(protect, getAllToDos)
router
  .route('/:id')
  .delete(protect, deleteToDo)
  .get(protect, getToDoById)
  .patch(protect, updateToDo)

export default router
