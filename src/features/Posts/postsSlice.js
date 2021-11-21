import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const response = await api.get('/posts');

	return response.data;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (newPost) => {
	const response = await api.post('/posts', newPost);

	return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postId) => {
	const response = await api.delete(`/posts/${postId}`);

	return { data: response.data, id: postId };
});

export const editPost = createAsyncThunk('posts/editPost', async (editedPost) => {
	const response = await api.put(`/posts/${editedPost.id}`, editedPost);

	return response.data;
});

const initialState = {
	posts: [],
	status: 'idle',
	error: null,
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchPosts.pending, (state, _action) => {
				state.status = 'loading';
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.posts = state.posts.concat(action.payload);
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(addNewPost.fulfilled, (state, action) => {
				const { title, body, userId } = action.payload;
				const lastItem = state.posts[state.posts.length - 1];
				const newPost = {
					id: (lastItem?.id ? lastItem.id : 0) + Math.floor(Math.random() * 10),
					title,
					body,
					userId,
				};

				state.posts.push(newPost);
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				state.posts = state.posts.filter((post) => post.id !== action.payload.id);
			})
			.addCase(editPost.fulfilled, (state, action) => {
				const editedPost = action.payload;

				state.posts = state.posts.map((post) => (post.id !== editedPost.id ? post : editedPost));
			});
	},
});

// export const { } = postsSlice.actions;

export default postsSlice.reducer;

export const selectAllPosts = (state) => state.posts.posts;
export const selectPostById = (state, postId) =>
	state.posts.posts.find((post) => post.id === postId);
