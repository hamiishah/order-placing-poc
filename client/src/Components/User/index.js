import React, {useState,useEffect} from 'react';
import './index.css'
import Header from '../Page/header'
import {
    Card, notification, Modal, Button, Form, Input,
    DatePicker, Alert,
    InputNumber, Select,
} from 'antd';
import {PlusCircleOutlined} from "@ant-design/icons";

import API_URLS from '../../api/apiUrl';
import {get,post} from '../../api/services';
const Layout = () => {
    const [cards,setCards] = useState({})
    const [response,setResponse] = useState(null)
    const [count, setCount] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    };
    const getUser = async ()=>{
        try{
            let res = await post(API_URLS.cards.orderDetail);
            setCards(res.data.data);
        } catch (e){
            setResponse(e.message)
        // console.log("E data", )
        }
    }
    useEffect( () => {
        getUser();
        // onFinish();
    }, [count+1]);
    const alert=(cards, status)=>{
        if(cards?.status === "Rejected"){
            return(
                <Alert
                    message="Error Text"
                    description="Your Card Request has been Rejected."
                    type="error"
                    closable
                    onClose={onClose}
                />
            )
        } if (cards?.status === "Accepted"){
            return(
                <>
                    <Alert message="Success Text" type="success" />
                </>
            )
        }
        if (cards?.status === "Pending"){
            return(
                <>
                    <Alert message="Please Wait your Details can accepted or Rejected" type="info" />
                </>
            )
        }
        if (response === "Request failed with status code 404"){
            return(
                <>
                    <Alert message="Please enter you card Details" type="error" />
                </>
            )
        }
    }
    const onFinish =  async (values) => {
        try {
            let res = await post(API_URLS.cards.add,values)
            if (res.data.message){
                openNotificationWithIcon('success', res.data.message)
                setCount(count+1);
            }
        } catch (e) {
            if (e.response && e.response.data) {
                openNotificationWithIcon('error', e?.response.data.message)
            }
        }
        setIsModalVisible(false);

    };
    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message,
        });
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const showModal = () => {
        setIsModalVisible(true);
    };
    const button = (cards)=>{
        if(cards?.status === "Rejected"){
            return(
                <Button type="primary" className='resentbtn my-2' onClick={showModal}> Resend Offer</Button>
            )
        }
    }
    return (
        <div>
            <div>
                <Header/>
            </div>

            {alert(cards)}
            <div className="order-cards">
                <div className="Add-users">
                    <Button type="primary"onClick={showModal}>
                        <PlusCircleOutlined />
                        <span className="text">Add card Detail</span>
                    </Button>
                    <Modal title="Add User" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Card Number"
                                name="card_number"
                                type="number"
                                rules={[{ required: true, message: 'Please input your card number!' }]}
                            >
                                <Input maxLength="16"/>
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
                            <Form.Item label="Add Month"
                                       name="month"
                                       type="number"
                                       rules={[{ required: true, message: 'Please Add Amount!' }]}
                            >
                                <InputNumber />
                            </Form.Item>
                            <Form.Item label="Add Year"
                                       name="year"
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
                        {cards?.card ? (<><p>Card Number: <span className='number'>{cards?.card?.card_number}</span></p>
                            <p>Card Status: <span className='status'>{cards?.status}</span></p></>)
                            :
                            "Record Not Found"}

                        {button(cards)}
                        {/*<p>Card content</p>*/}
                    </Card>
        </div>
    );
};
export default Layout;
