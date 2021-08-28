import React, { useState } from 'react';
import '../Page/layout.css'
import {v4 as uuidv4} from 'uuid';
import { useHistory } from "react-router-dom";
import Header from '../Page/header'
import {PlusCircleOutlined} from '@ant-design/icons';
import { Card, Col, Row,Table, Tag, Space,Modal, Button,Form, Input, Select } from 'antd';

const Layout = () => {
    const { Option } = Select;
    const history = useHistory();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handlecard =()=>{
        history.push("/admin/orders");
    }
    const onFinish = (values: any) => {
        console.log('Success:', values);
        localStorage.setItem("TestLogin", JSON.stringify(values));
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        setIsModalVisible(false);
    };
    const showModal = () => {
        setIsModalVisible(true);
    };
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
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
                    <Button type="primary" onClick={showModal}>
                        <PlusCircleOutlined />Add users
                    </Button>
                    <Modal title="Add User" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                label="Role"
                                name="role"
                                rules={[{ required: true, message: 'Please Select Role!' }]}
                            >
                                <Select defaultValue="Select Role" style={{ width: 120 }}>
                                    <Option value="ROLE_CLIENT">Client</Option>
                                    <Option value="ROLE_ASSISTANT">Assistant</Option>
                                    <Option value="ROLE_ADMIN">Assistant</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 20 }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
                <div>
                    <Table columns={columns} dataSource={data} />
                </div>
            </div>
        </div>
    );
};
export default Layout;
