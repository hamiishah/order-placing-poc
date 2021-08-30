import React from 'react';
import {Link, useHistory} from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {get, post} from "../../api/services";
import API_URLS from "../../api/apiUrl";
import {notification} from "antd";

const SignupForm = () => {
    let history = useHistory();
    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message,
        });
    };
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                let res = await post(API_URLS.Reset.forgetpassword, values);
                if (res.status===200){
                    openNotificationWithIcon('success', res.data.message)
                    history.push("/resetpassword");
                }

            }catch (e){
                // console.log(e.data.message)
                if (e.message){
                    openNotificationWithIcon('error', "Account Not Found for given email. Please check your Email and try again")
                }

            }
        },
    });
    return (
        <div className='login'>
            <form onSubmit={formik.handleSubmit} className='login-form'>
                <h1>Forget Password</h1>
                <input id="email"
                       placeholder='Email-Address'
                       type="email" {...formik.getFieldProps('email')} />
                {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                ) : null}
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
};
export default SignupForm;
