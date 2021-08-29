import React, {useEffect, useState} from 'react';
import '../Page/layout.css'
import Header from '../Page/header'
import {Table, Tag, Space,Modal, Button,Form, Input } from 'antd';
import {get} from "../../api/services";
import API_URLS from "../../api/apiUrl";

const Layout = () => {
    const [cards, setCard] = useState([]);
    const [count, setCount] = useState(0);
    const getCards = async ()=>{
        let res = await get(API_URLS.cards.list);
        setCard(res?.data?.data);
    }
    useEffect( () => {
        getCards();
    }, [count]);
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Card Number',
            dataIndex: 'card_number',
            key: 'card_number',
        },
        {
            title: 'CVC',
            dataIndex: 'cvc',
            key: 'cvc',
        },
        {
            title: 'Month',
            dataIndex: 'month',
            key: 'month',
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a>Change Status</a>
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
                <div>
                    <Table columns={columns} dataSource={cards} />
                </div>
            </div>
        </div>
    );
};
export default Layout;
