import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './features/Posts/postsSlice';
import authReducer from './features/auth/authSlice';

export default configureStore({
	reducer: {
		posts: postsReducer,
		auth: authReducer,
	},
});
