import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ListItem } from '../types/tipes'

const initialState: { list: ListItem[] } = {
    list: [],
}

const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        addList: (state, action: PayloadAction<ListItem>) => {
            state.list.push(action.payload)
        },
        removeList: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter(item => item.id !== action.payload)
        },
        toggleComplete: (state, action: PayloadAction<string>) => {
            const item = state.list.find(item => item.id === action.payload)
            if (item) {
                item.isActive = !item.isActive
            }
        },
    },
})

export default listSlice.reducer

export const { addList, removeList, toggleComplete } = listSlice.actions

export const selectList = (state: { list: { list: ListItem[] } }) =>
    state.list.list
