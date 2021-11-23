import { useDispatch } from 'react-redux';
import { Button, Form, Spinner } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import { addNewPost } from './postsSlice';
import * as Yup from 'yup';

export const AddPostForm = () => {
	const dispatch = useDispatch();

	const yupSchema = Yup.object().shape({
		title: Yup.string().required('*Post title is required'),
		content: Yup.string().required('*Post content is required'),
	});

	return (
		<Formik
			initialValues={{ title: '', content: '', responseError: '' }}
			validationSchema={yupSchema}
			onSubmit={(values, { setSubmitting, setFieldError, resetForm }) => {
				dispatch(addNewPost({ title: values.title, body: values.content }))
					.unwrap()
					.then(() => {
						resetForm();
					})
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
};
