import React, {useState} from 'react';
import './index.css'
import Header from '../Page/header'
import {Card, notification, Modal, Button, Form, Input,
    DatePicker,
    InputNumber,} from 'antd';
import {PlusCircleOutlined} from "@ant-design/icons";

import API_URLS from '../../api/apiUrl';
import {get,post} from '../../api/services';
const Layout = () => {
    const [cards,setCards] = useState([])
    const [count, setCount] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const onFinish =  async (values) => {
        console.log('Success:', values);
        let res = await post(API_URLS.cards.add,values)
        setIsModalVisible(false);
        if (res.data.message){
            openNotificationWithIcon('success', res.data.message)
            setCount(count+1);
        }
        if(res?.message){
            openNotificationWithIcon('error', res?.message)
        }
    };
    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message,
        });
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const showModal = () => {
        setIsModalVisible(true);
    };
    return (
        <div>
            <div>
                <Header/>
            </div>
            <div className="order-cards">
                <div className="Add-users">
                    <Button type="primary" onClick={showModal}>
                        <PlusCircleOutlined />Add card Detail
                    </Button>
                    <Modal title="Add User" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Card No"
                                name="Card No"
                                type="number"
                                rules={[{ required: true, message: 'Please input your cardnumber!' }]}
                            >
                                <Input maxLength="16"/>
                            </Form.Item>
                            <Form.Item label="Select Date"
                                       name="date"
                                       rules={[{ required: true, message: 'Please Select date!' }]}
                            >
                                <DatePicker required />
                            </Form.Item>
                            <Form.Item label="Add Amount"
                                       name="amount"
                                       type="number"
                                       rules={[{ required: true, message: 'Please Add Amount!' }]}
                            >
                                <InputNumber />
                            </Form.Item>
                            <Form.Item label="Add CVC"
                                       name="cvc"
                                       type="number"
                                       rules={[{ required: true, message: 'Please Add Amount!' }]}
                            >
                                <InputNumber />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 20 }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </div>
                    <Card className='card' title="Card Entry Detail" style={{ width: 300 }}>
                        <p>Previous Status: Active</p>
                        <p>Previous Status: Reject</p>
                        {/*<p>Card content</p>*/}
                        <Button type="primary" className='resentbtn' onClick={showModal}> Resend Offer</Button>
                    </Card>
        </div>
    );
};
export default Layout;
