import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import todoService from './todoService'

const initialState = {
  todos: [],
  todo: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new todo
export const createtodo = createAsyncThunk(
  'todos/create',
  async (todoData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await todoService.createtodo(todoData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user todos
export const gettodos = createAsyncThunk(
  'todos/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await todoService.gettodos(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user todo
export const gettodo = createAsyncThunk(
  'todos/get',
  async (todoId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await todoService.gettodo(todoId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Close todo
export const closetodo = createAsyncThunk(
  'todos/close',
  async (todoId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await todoService.closetodo(todoId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createtodo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createtodo.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(createtodo.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(gettodos.pending, (state) => {
        state.isLoading = true
      })
      .addCase(gettodos.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.todos = action.payload
      })
      .addCase(gettodos.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(gettodo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(gettodo.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.todo = action.payload
      })
      .addCase(gettodo.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(closetodo.fulfilled, (state, action) => {
        state.isLoading = false
        state.todos.map((todo) =>
          todo._id === action.payload._id
            ? (todo.status = 'closed')
            : todo
        )
      })
  },
})

export const { reset } = todoSlice.actions
export default todoSlice.reducer
