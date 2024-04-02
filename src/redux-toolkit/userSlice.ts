import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface UserInfo {
    uuid?: string;
    userName?: string | null;
    email: string | null;
    password?: string | null;
    bio?: string | null;
    profilePicture?: string | null;
    provider?: string | null;
}

export interface UserState {
    userInfo: UserInfo | null;
}

const initialState: UserState = {
    userInfo: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<UserInfo>) => {
            state.userInfo = action.payload;
        },
        logOut: (state) => {
            state.userInfo = null;
        }
    }
});

export const { addUser, logOut } = userSlice.actions;
export default userSlice.reducer;