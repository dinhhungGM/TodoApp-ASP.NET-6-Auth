import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../../utils/axiosClient";
import Toast from "../../../utils/Toast";
import { RootState } from "../../../app/store";

export interface Todo {
  todoId: string;
  todoName: string;
  todoDescription: string;
  todoIsComplete: boolean;
  userId: string;
  
}

export interface TodoState {
  todos: Todo[];
  todo: Todo;
  loading: boolean;
  updateModalShow: boolean;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  todo: {
    todoId: "",
    todoName: "",
    todoDescription: "",
    todoIsComplete: false,
    userId: "",
  },
  updateModalShow: false,
};

export interface fetchTodosAsyncParams {
    userId: string;
}

export const fetchTodosAsync = createAsyncThunk(
  "todo/fetchTodos",
  async (data: fetchTodosAsyncParams, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/users/${data.userId}/todoitems`);    
      return response;
    } catch (error: any) {
      rejectWithValue(error);
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "todo/addTodo",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/todoitems", data);
      return response;
    } catch (error: any) {
      rejectWithValue(error);
    }
  }
);

export const updateTodoAsync = createAsyncThunk(
  "todo/updateTodo",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/todoitems/${data.todoId}`, data);
      return response;
    } catch (error: any) {
      rejectWithValue(error);
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todo/deleteTodo",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(`/todoitems/${data.todoId}`);
      return response;
    } catch (error: any) {
      rejectWithValue(error);
    }
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setUpdateModalShow: (state, action) => {
      state.updateModalShow = action.payload;
    },
    setTodo: (state, action) => {
      state.todo = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodosAsync.fulfilled, (state, action: any) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(addTodoAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodoAsync.fulfilled, (state, action: any) => {
        state.loading = false;
        state.todos.push(action.payload);
        Toast.fire({
          icon: "success",
          title: "Todo added successfully",
        });
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.loading = false;
        Toast.fire({
          icon: "error",
          title: "Error adding todo",
        });
      })
      .addCase(updateTodoAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTodoAsync.fulfilled, (state, action: any) => {
        state.loading = false;
        const todo: Todo = action.payload;
        const index = state.todos.findIndex(
          (todoItem: Todo) => todoItem.todoId === todo.todoId
        );
        state.todos[index] = todo;
        Toast.fire({
          icon: "success",
          title: "Todo updated successfully",
        });
      })
      .addCase(updateTodoAsync.rejected, (state, action) => {
        state.loading = false;
        Toast.fire({
          icon: "error",
          title: "Error updating todo",
        });
      })
      .addCase(deleteTodoAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action: any) => {
        state.loading = false;
        const todoId: string = action.payload;
        const index = state.todos.findIndex(
          (todoItem: Todo) => todoItem.todoId === todoId
        );
        state.todos.splice(index, 1);
        Toast.fire({
          icon: "success",
          title: "Todo deleted successfully",
        });
      })
      .addCase(deleteTodoAsync.rejected, (state, action) => {
        state.loading = false;
        Toast.fire({
          icon: "error",
          title: "Error deleting todo",
        });
      });
  },
});


export const selectTodos = (state: RootState) => state.todo.todos;
export const selectUpdateModalShow = (state: RootState) => state.todo.updateModalShow;
export const selectTodo = (state: RootState) => state.todo.todo;
export const { setUpdateModalShow, setTodo } = todoSlice.actions;

export default todoSlice.reducer;

