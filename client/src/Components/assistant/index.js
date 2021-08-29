import React, {useEffect, useState} from 'react';
import '../Page/layout.css'
import Header from '../Page/header'
import {Table, Tag, Space,Modal, Button,Form, Input } from 'antd';
import {get} from "../../api/services";
import API_URLS from "../../api/apiUrl";
import axios from "axios";

const Layout = () => {
    const [state, setstate] = useState([]);
    const [count, setCount] = useState(0);
    const getCards = async ()=>{
        let res= await axios.get(API_URLS.cards.list).then(
            res => {
                console.log(res.data.data)
                setstate(
                    res.data.data.map(row => ({
                        Amount: row.card.amount,
                        CVC: row.card.cvc,
                        Status: row.status,
                        Month: row.card.month,
                        Year: row.card.year,
                        'Card Number': row.card.card_number,
                    }))
                );
            }
        );
    }
    useEffect( () => {
        getCards();
    }, [count]);

    const columns = [
        {
            title: 'Amount',
            dataIndex: 'Amount',
            width: 150
        },
        {
            title: "CVC",
            dataIndex: "CVC",
            width: 150
        },
        {
            title: "Card Number",
            dataIndex: "Card Number",
            width: 150
        },
        {
            title: "Month",
            dataIndex: "Month",
            width: 150
        },
        {
            title: "Year",
            dataIndex: "Year",
            width: 150
        },
        {
            title: "Status",
            dataIndex: "Status",
            width: 150
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space>
                    <a>Change Status</a>
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
                <div>
                    <Table columns={columns} dataSource={state} />
                </div>
            </div>
        </div>
    );
};
export default Layout;
