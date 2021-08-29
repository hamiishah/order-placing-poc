import {Link} from 'react-router-dom';
import React from 'react';
import {useHistory} from "react-router-dom";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import './style.css';
import {notification} from "antd";
import {login} from '../../api/services';

function LoginPage() {
    const history = useHistory();
    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message,
        });
    };
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            password: Yup.string().required('Required'),
            email: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            let res = await login(values);
            if (res.data && res.data.role === "ROLE_ADMIN") {
                openNotificationWithIcon('success', res.data.message);
                history.push("/admin");
            }
            if (res.data && res.data.role === "ROLE_CLIENT") {
                openNotificationWithIcon('success', res.data.message);
                history.push("/user");
            }
            if (res.data && res.data.role === "ROLE_ASSISTANT") {
                openNotificationWithIcon('success', res.data.message);
                history.push("/assistant");
            }
            if (res?.message) {
                openNotificationWithIcon('error', res?.message);
            }
        },

    });
    return (
        <div className='login'>
            <form onSubmit={formik.handleSubmit}
                  className='login-form'>
                <h1>Login Page</h1>
                <input id="email"
                       placeholder='Email-Address'
                       type="email" {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                ) : null}
                <input id="password"
                       placeholder='New-Password'
                       type="password" {...formik.getFieldProps('password')} />
                {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                ) : null}
                <button type="submit" className="submit-btn">Submit</button>
                <Link to="/forgetpassword" className="Link">Forget Password</Link>
            </form>
        </div>
    );
};
export default LoginPage;

