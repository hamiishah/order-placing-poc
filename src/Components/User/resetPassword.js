import {Link} from 'react-router-dom';
import React from 'react';
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import '../Login/style.css';

function LoginPage  () {
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            passwords: '',
            password:'',
        },
        onSubmit: values => {
            console.log(values)
            history.push("/user");
        },

    });
    return (
        <div className='login'>
            <form onSubmit={formik.handleSubmit}
                  className='login-form'>
                <h1>Reset Password</h1>
                <input id="password"
                       placeholder='Enter old=password'
                       type="password"
                       required
                />
                <input id="passwords"
                       placeholder='New-Password'
                       type="password" required />
                <button type="submit" className="submit-btn">Submit</button>
                <Link to="/register" className="Link">Register a new Account</Link>
            </form>
        </div>
    );
};
export default LoginPage;