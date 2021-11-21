import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewPost } from './postsSlice';

export const AddPostForm = () => {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [requestStatus, setRequestStatus] = useState('idle');

	const dispatch = useDispatch();

	const onTitleChanged = (e) => setTitle(e.target.value);
	const onContentChanged = (e) => setBody(e.target.value);

	const onSavePostClicked = async () => {
		if (requestStatus === 'idle') {
			try {
				setRequestStatus('pending');
				await dispatch(addNewPost({ title, body })).unwrap();
				setTitle('');
				setBody('');
			} catch (err) {
				console.error('Failed to save post: ', err);
			} finally {
				setRequestStatus('idle');
			}
		}
	};

	return (
		<section>
			<h2>Add a New Post</h2>
			<form>
				<label htmlFor="postTitle">Post Title:</label>
				<input
					id="postTitle"
					name="postTitle"
					type="text"
					value={title}
					onChange={onTitleChanged}
				/>
				<label htmlFor="postContent">Content:</label>
				<textarea id="postContent" name="postContent" value={body} onChange={onContentChanged} />
				<button disabled={requestStatus === 'pending'} type="button" onClick={onSavePostClicked}>
					Save Post
				</button>
			</form>
		</section>
	);
};
