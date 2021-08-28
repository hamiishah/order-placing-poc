import React, {useState} from 'react';
import './index.css'
import Header from '../Page/header'
import {Card, Space, Modal, Button, Form, Input,
    DatePicker,
    InputNumber, Table, Tag,} from 'antd';
import {PlusCircleOutlined} from "@ant-design/icons";

const { Meta } = Card;

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
                <div className="table">
                    <Table columns={columns} dataSource={data} />
                </div>
        </div>
    );
};
export default Layout;
