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
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Product 1" />
                    <p className="price">Price: 15$</p>
                    <div className="Add-users">
                        <Button type="primary" onClick={showModal}>
                            <PlusCircleOutlined />Add order
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
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Select Date"
                                           rules={[{ required: true, message: 'Please Select date!' }]}
                                >
                                    <DatePicker />
                                </Form.Item>
                                <Form.Item label="Add Amount"
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
                </Card>,
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Product 2" />
                    <p className="price">Price: 15$</p>
                    <div className="Add-users">
                        <Button type="primary" onClick={showModal}>
                            <PlusCircleOutlined />Add order
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
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Select Date"
                                           rules={[{ required: true, message: 'Please Select date!' }]}
                                >
                                    <DatePicker />
                                </Form.Item>
                                <Form.Item label="Add Amount"
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
                </Card>,
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Product 3" />
                    <p className="price">Price: 15$</p>
                    <div className="Add-users">
                        <Button type="primary" onClick={showModal}>
                            <PlusCircleOutlined />Add order
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
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Select Date"
                                           rules={[{ required: true, message: 'Please Select date!' }]}
                                >
                                    <DatePicker />
                                </Form.Item>
                                <Form.Item label="Add Amount"
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
                </Card>,
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Product 4" />
                    <p className="price">Price: 15$</p>
                    <div className="Add-users">
                        <Button type="primary" onClick={showModal}>
                            <PlusCircleOutlined />Add order
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
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Select Date"
                                           rules={[{ required: true, message: 'Please Select date!' }]}
                                >
                                    <DatePicker />
                                </Form.Item>
                                <Form.Item label="Add Amount"
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
                </Card>,
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Product 5"/>
                    <p className="price">Price: 15$</p>
                    <div className="Add-users">
                        <Button type="primary" onClick={showModal}>
                            <PlusCircleOutlined />Add order
                        </Button>
                        <Modal title="Add User" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                            <Form
                                name="basic"
                                initialValues={{}}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    label="Card No"
                                    name="Card No"
                                    rules={[{ required: true, message: 'Please input your cardnumber!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Select Date"
                                >
                                    <DatePicker />
                                </Form.Item>
                                <Form.Item label="Add Amount"
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
                </Card>,
            </div>
                <div className="table">
                    <Table columns={columns} dataSource={data} />
                </div>
        </div>
    );
};
export default Layout;
