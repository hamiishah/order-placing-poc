import API_URLS from '../../api/apiUrl';
import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
// import { useFormik } from 'formik';
import '../Login/style.css';
import Header from '../Page/header/index'
import {get, post} from "../../api/services";
import {Button, Form, Input, notification, Select} from "antd";

function LoginPage  () {
    const history = useHistory();
    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message,
        });
    };
    const onFinish=async (values)=>{
        try {
            let res = await post(API_URLS.Reset.changepassword,values);
            if (res.status===200){
                openNotificationWithIcon('success', res.data.message)
                history.push("/profile");
            }

        }catch (e){
            // console.log(e.data.message)
            if (e.message){
                openNotificationWithIcon('error', "Password Mismatch")
            }

        }
    }
    return (
        <>
            <div>
                <Header />
            </div>
        <div className='Reset'>
            <Form
                name="basic"
                initialValues={{remember: true}}
                onFinish={onFinish}
            >
                <Form.Item
                    label="OLD-Password"
                    name="oldPassword"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>
                    <Form.Item
                        label="New-Password"
                        name="newPassword"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>
                <span className='float-end'><a href="/profile">Back to Profile</a></span>
                    <Form.Item wrapperCol={{offset: 19, span:16}} className='my-5'>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
            </Form>
        </div>
        </>
    );
};
export default LoginPage;