import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { Task } from '../types/types'

export interface AppState {
  editedTask: Task
  csrfTokeExp: boolean
}

const initialState: AppState = {
  editedTask: {
    id: '',
    title: '',
    description: '',
  },
  csrfTokeExp: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // editedTaskにstateをセットするアクション
    setEditedTask: (state, action: PayloadAction<Task>) => {
      state.editedTask = action.payload
    },
    resetEditedTask: (state) => {
      state.editedTask = initialState.editedTask
    },
    toggleCsrfState: (state) => {
      state.csrfTokeExp = !state.csrfTokeExp
    },
  },
})

export const { setEditedTask, resetEditedTask, toggleCsrfState } =
  appSlice.actions

// Reduxのstateの中身を返す関数
export const selectTask = (state: RootState) => state.app.editedTask
export const selectCsrfState = (state: RootState) => state.app.csrfTokeExp

export default appSlice.reducer
