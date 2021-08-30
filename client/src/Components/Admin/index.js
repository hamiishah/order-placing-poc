import React, {useState,useEffect} from 'react';
import '../Page/layout.css'
import {useHistory} from "react-router-dom";
import Header from '../Page/header'
import API_URLS from '../../api/apiUrl';
import {get,post} from '../../api/services';
import {PlusCircleOutlined} from '@ant-design/icons';
import {Card, Col, Row, Table, Tag, Space, Modal, Button, Form, Input, Select, notification} from 'antd';

const Layout = () => {
    const {Option} = Select;
    const history = useHistory();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(0);
    const getUser = async ()=>{
        let res = await get(API_URLS.users.list);
        setUsers(res.data.data);
    }
    useEffect( () => {
        getUser();
        // onFinish();
    }, [count+1]);
    const handlecard = () => {
        history.push("/admin/orders");
    }
    const handleDelete = async (data)=>{
        let res = await post(API_URLS.users.delete,{_id:data?._id});
        openNotificationWithIcon('success', res.data.message)
        setCount(count+1);
    }
    const onFinish =async (values) => {
        try {
            let res = await post(API_URLS.users.add,values);
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
    const showModal = () => {
        setIsModalVisible(true);
    };
    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            key: 'role',
            dataIndex: 'role',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    {record?.role !== "ROLE_ADMIN" ?
                        <Button type='primary' onClick={() => handleDelete(record)}>Delete</Button>:
                        <Button type='primary' onClick={() => handleDelete(record)}>Delete</Button>
                    }
                </Space>
            ),
        },
    ];
    return (
        <div>
            <div>
                <Header/>
            </div>
            <div className="container">
                <Row gutter={16}
                     className="cards">
                    <Col span={11}>
                        <Card hoverable title="Users" bordered={true} className='user-card'>
                            <p>Total number of users : 5</p>
                            <p>Active Users : 20</p>
                            <p>Blocked Users : 3</p>
                        </Card>
                    </Col>
                    <Col span={11}>
                        <Card
                            onClick={handlecard}
                            hoverable title="Orders" bordered={true}>
                            <p>Total number of Product Orders : 290</p>
                            <p>Accept Orders : 20</p>
                            <p>Reject Orders : 3</p>
                            <p>Pending Orders : 13</p>
                        </Card>
                    </Col>
                </Row>
                <div className="Add-users">
                    <Button type="primary" className='my-3' onClick={showModal}>
                        <PlusCircleOutlined/>Add users
                    </Button>
                    <Modal title="Add User" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                        <Form
                            name="basic"
                            initialValues={{remember: true}}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{required: true, message: 'Please input your username!'}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Last Name"
                                name="lastName"
                                rules={[{required: true, message: 'Please input your Last Name!'}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="First Name"
                                name="firstName"
                                rules={[{required: true, message: 'Please input your First Name!'}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{required: true, message: 'Please input your password!'}]}
                            >
                                <Input.Password/>
                            </Form.Item>

                            <Form.Item
                                label="Role"
                                name="role"
                                rules={[{required: true, message: 'Please Select Role!'}]}
                            >
                                <Select defaultValue="Select Role" style={{width: 400}}>
                                    <Option value="ROLE_CLIENT">CLIENT</Option>
                                    <Option value="ROLE_ASSISTANT">ASSISTANT</Option>
                                    <Option value="ROLE_ADMIN">ADMIN</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item wrapperCol={{offset: 20}}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
                <div>
                    <Table columns={columns} dataSource={users}/>
                </div>
            </div>
        </div>
    );
};
export default Layout;
