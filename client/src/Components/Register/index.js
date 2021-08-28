import React from 'react';
import {Link, useHistory} from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignupForm = () => {
    let history = useHistory();
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password:'',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            lastName: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            history.push("/layout");
            console.log(values);
        },
    });
    return (
        <div className='login'>
            <form onSubmit={formik.handleSubmit} className='login-form'>
                <h1>Registration Page</h1>
                <input
                    id="firstName"
                    type="text"
                    placeholder='First-Name'
                    {...formik.getFieldProps('firstName')}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                    <div>{formik.errors.firstName}</div>
                ) : null}

                <input id="lastName"
                       placeholder='Last-Name'
                       type="text" {...formik.getFieldProps('lastName')} />
                {formik.touched.lastName && formik.errors.lastName ? (
                    <div>{formik.errors.lastName}</div>
                ) : null}

                <input id="email"
                       placeholder='Email-Address'
                       type="email" {...formik.getFieldProps('email')} />
                {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                ) : null}
                <input id="password"
                       placeholder='New-Password'
                       type="password" {...formik.getFieldProps('password')} />
                {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                ) : null}
                <input id="password"
                       placeholder='Confirm-Password'
                       type="password" {...formik.getFieldProps('password')} />
                {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                ) : null}
                <button type="submit" className="submit-btn">Submit</button>
                <Link to="/" className="Link">Go back to Login</Link>
            </form>
        </div>
    );
};
export default SignupForm;
