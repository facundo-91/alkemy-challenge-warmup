import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Spinner } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import { editPost, selectPostById } from './postsSlice';
import * as Yup from 'yup';

const EditPostForm = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const id = Number(params.id);
	const post = useSelector((state) => selectPostById(state, id));

	const yupSchema = Yup.object().shape({
		title: Yup.string().required('*Post title is required'),
		content: Yup.string().required('*Post content is required'),
	});

	return (
		<Formik
			initialValues={{ title: post.title, content: post.body, responseError: '' }}
			validationSchema={yupSchema}
			onSubmit={(values, { setSubmitting, setFieldError }) => {
				dispatch(editPost({ id, title: values.title, body: values.content, userId: post.userId }))
					.unwrap()
					.catch((_error) => {
						setFieldError('responseError', '*Failed to save post');
					})
					.finally(() => {
						setSubmitting(false);
					});
			}}>
			{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
				<Form
					className="d-flex flex-column min-vh-100 align-items-center justify-content-center"
					onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="formTitle">
						<Form.Label>Title:</Form.Label>
						<Form.Control
							className={touched.title && errors.title ? 'border-2 border-danger' : null}
							name="title"
							placeholder="Title"
							style={{ width: '30rem' }}
							type="text"
							value={values.title}
							onBlur={handleBlur}
							onChange={handleChange}
						/>
						<ErrorMessage className="text-danger" component="div" name="title" />
					</Form.Group>
					<Form.Group className="mb-3" controlId="formContent">
						<Form.Label>Content:</Form.Label>
						<Form.Control
							as="textarea"
							className={touched.content && errors.content ? 'border-2 border-danger' : null}
							name="content"
							placeholder="Content"
							style={{ height: '10rem', width: '30rem' }}
							type="text"
							value={values.content}
							onBlur={handleBlur}
							onChange={handleChange}
						/>
						<ErrorMessage className="text-danger" component="div" name="content" />
					</Form.Group>
					<Button className="my-2" disabled={isSubmitting} style={{ width: '100px' }} type="submit">
						{isSubmitting ? (
							<Spinner animation="border" aria-hidden="true" as="span" role="status" size="sm" />
						) : (
							'Save Post'
						)}
					</Button>
					{errors.responseError && <div className="text-danger">{errors.responseError}</div>}
				</Form>
			)}
		</Formik>
	);

	/*
	const params = useParams();
	const id = Number(params.id);
	const post = useSelector((state) => selectPostById(state, id));

	const [title, setTitle] = useState(post.title);
	const [body, setBody] = useState(post.body);
	const [requestStatus, setRequestStatus] = useState('idle');

	const dispatch = useDispatch();

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
		<Container>
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
		</Container>
	);
	*/
};

export default EditPostForm;
