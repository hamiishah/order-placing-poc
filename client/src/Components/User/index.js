import React, {useState} from 'react';
import './index.css'
import Header from '../Page/header'
import {Card, Space, Modal, Button, Form, Input,
    DatePicker,
    InputNumber,} from 'antd';
import {PlusCircleOutlined} from "@ant-design/icons";


const Layout = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const onFinish = (values: any) => {
        console.log('Success:', values);
        setIsModalVisible(false);
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
