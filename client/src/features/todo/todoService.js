import axios from 'axios'

const API_URL = '/api/todos/'

// Create new todo
const createtodo = async (todoData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, todoData, config)

  return response.data
}

// Get user todos
const gettodos = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Get user todo
const gettodo = async (todoId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + todoId, config)

  return response.data
}

// Close todo
const closetodo = async (todoId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(
    API_URL + todoId,
    { status: 'closed' },
    config
  )

  return response.data
}

const todoService = {
  createtodo,
  gettodos,
  gettodo,
  closetodo,
}

export default todoService
