import { Formik, ErrorMessage } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import * as Yup from 'yup';

const Login = () => {
	const dispatch = useDispatch();

	const yupSchema = Yup.object().shape({
		email: Yup.string().email('*Must be a valid email address').required('*Email is required'),
		password: Yup.string().required('*Password is required'),
	});

	return (
		<Formik
			initialValues={{ email: '', password: '', responseError: '' }}
			validationSchema={yupSchema}
			onSubmit={(values, { setSubmitting, setFieldError }) => {
				dispatch(login({ email: values.email, password: values.password }))
					.unwrap()
					.catch((_error) => {
						setFieldError('responseError', '*Wrong Email or Password');
					})
					.finally(() => {
						setSubmitting(false);
					});
			}}>
			{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
				<Form
					className="d-flex flex-column min-vh-100 align-items-center justify-content-center"
					onSubmit={handleSubmit}>
					<div>
						<h4>Login:</h4>
						<Form.Group className="mb-3" controlId="formEmail">
							<Form.Label>Email:</Form.Label>
							<Form.Control
								className={touched.email && errors.email ? 'border-2 border-danger' : null}
								name="email"
								placeholder="Email"
								type="text"
								value={values.email}
								onBlur={handleBlur}
								onChange={handleChange}
							/>
							<ErrorMessage className="text-danger" component="div" name="email" />
						</Form.Group>
						<Form.Group className="mb-3" controlId="formPassword">
							<Form.Label>Password:</Form.Label>
							<Form.Control
								className={touched.password && errors.password ? 'border-2 border-danger' : null}
								name="password"
								placeholder="Password"
								type="password"
								value={values.password}
								onBlur={handleBlur}
								onChange={handleChange}
							/>
							<ErrorMessage className="text-danger" component="div" name="password" />
						</Form.Group>
						<Button className="my-2" disabled={isSubmitting} type="submit">
							Submit
						</Button>
						{errors.responseError && <div className="text-danger">{errors.responseError}</div>}
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default Login;
