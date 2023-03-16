import { createSlice } from "@reduxjs/toolkit";
const initialState = { todoList: [], completedList: [] };
const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    storeTodo: (state, action) => {
      console.log(action.payload);
      state.todoList = action.payload.todoList;
      state.completedList = action.payload.completedList;
    },
    addTodo: (state, action) => {
      console.log(action.payload);
      state.todoList.unshift(action.payload);
    },
    tick: (state, action) => {
      state.todoList = state.todoList.filter(
        (todo) => todo._id !== action.payload._id
      );
      state.completedList.unshift(action.payload);
    },
    deleteToDo: (state, action) => {
      if (action.payload.type === "completedList") {
        state.completedList = state.completedList.filter(
          (todo) => todo._id !== action.payload.id
        );
      } else {
        state.todoList = state.todoList.filter(
          (todo) => todo._id !== action.payload.id
        );
      }
    },
    reset: (state, action) => {
      state = initialState;
    },
  },
});

export const { addTodo, storeTodo, tick, deleteToDo,reset } = todoSlice.actions;
export default todoSlice.reducer;
