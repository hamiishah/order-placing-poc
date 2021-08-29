import {Link} from 'react-router-dom';
import React from 'react';
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './style.css';
import {notification} from "antd";

function LoginPage  () {
    const history = useHistory();
    const openNotificationWithIcon = type => {
        notification[type]({
            message: 'Notification Title',
            description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        });
    };
    const formik = useFormik({
        initialValues: {
            email: '',
            password:'',
        },
        validationSchema: Yup.object({
            password: Yup.string().required('Required'),
            email: Yup.string().required('Required'),
        }),
        onSubmit: values => {
            // let category = JSON.parse(localStorage.getItem("TestLogin"));
            // alert(category)
            let email = values?.email;
            let roleArr = email.split('@');
            let role = roleArr[0];
            values.role = role;
            if(role==="admin"){
                history.push("/admin");
                openNotificationWithIcon('success')
            }
            else if(role==="client"){
                history.push("/user");
                openNotificationWithIcon('success')
            }
            else if(role==="assistant"){
                history.push("/assistant");
                openNotificationWithIcon('success')
            }
            else{
                openNotificationWithIcon('error')
                history.push("/");
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

