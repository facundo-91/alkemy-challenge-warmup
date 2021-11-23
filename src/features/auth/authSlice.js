import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../api';

const user = JSON.parse(localStorage.getItem('user'));

export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
	try {
		const data = await authService.login(email, password);

		return { user: data };
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data);
	}
});

export const logout = createAsyncThunk('auth/logout', () => {
	authService.logout();
});

const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: {
		[login.fulfilled]: (state, action) => {
			state.isLoggedIn = true;
			state.user = action.payload.user;
		},
		[login.rejected]: (state, _action) => {
			state.isLoggedIn = false;
			state.user = null;
		},
		[logout.fulfilled]: (state, _action) => {
			state.isLoggedIn = false;
			state.user = null;
		},
	},
});

// export const { } = authSlice.actions;

export default authSlice.reducer;
