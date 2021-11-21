import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { editPost, selectPostById } from './postsSlice';

const EditPostForm = () => {
	const [title, setTitle] = useState(post.title);
	const [body, setBody] = useState(post.body);
	const [requestStatus, setRequestStatus] = useState('idle');

	const dispatch = useDispatch();
	const params = useParams();
	const id = Number(params.id);
	const post = useSelector((state) => selectPostById(state, id));

	const onTitleChanged = (e) => setTitle(e.target.value);
	const onContentChanged = (e) => setBody(e.target.value);

	const onSavePostClicked = async () => {
		if (requestStatus === 'idle') {
			try {
				setRequestStatus('pending');
				await dispatch(editPost({ id, title, body, userId: post.userId })).unwrap();
			} catch (err) {
				console.error('Failed to save post: ', err);
			} finally {
				setRequestStatus('idle');
			}
		}
	};

	return (
		<section>
			<h2>Edit Post</h2>
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

export default EditPostForm;
