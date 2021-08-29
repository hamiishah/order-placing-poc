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
    }, [count]);
    const handlecard = () => {
        history.push("/admin/orders");
    }
    const handleDelete = async (data)=>{
        let res = await post(API_URLS.users.delete,{_id:data?._id});
        setCount(count+1);
    }
    const onFinish =async (values) => {
        let res = await post(API_URLS.users.add,values);
        setIsModalVisible(false);
        openNotificationWithIcon('success')
    };

    const openNotificationWithIcon = type => {
        notification[type]({
            message: 'Notification Title',
            description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        });
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        setIsModalVisible(false);
        openNotificationWithIcon('error')
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
                        <a onClick={() => handleDelete(record)}>Delete</a>:
                        <a disabled onClick={() => handleDelete(record)}>Delete</a>
                    }
                </Space>
            ),
        },
    ];

    {/*const data = [*/}
    {/*    {*/}
    {/*        key: '1',*/}
    {/*        name: 'John Brown',*/}
    {/*        age: 32,*/}
    {/*        address: 'New York No. 1 Lake Park',*/}
    {/*        tags: ['nice', 'developer'],*/}
    {/*    },*/}
    {/*    {*/}
    {/*        key: '2',*/}
    {/*        name: 'Jim Green',*/}
    {/*        age: 42,*/}
    //         address: 'London No. 1 Lake Park',
    //         tags: ['loser'],
    //     },
    //     {
    //         key: '3',
    //         name: 'Joe Black',
    //         age: 32,
    //         address: 'Sidney No. 1 Lake Park',
    //         tags: ['cool', 'teacher'],
    //     },
    // ];
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
                    <Button type="primary" onClick={showModal}>
                        <PlusCircleOutlined/>Add users
                    </Button>
                    <Modal title="Add User" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                        <Form
                            name="basic"
                            initialValues={{remember: true}}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
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
