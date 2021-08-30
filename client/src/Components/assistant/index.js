import React, {useEffect, useState} from 'react';
import '../Page/layout.css'
import Header from '../Page/header'
import {Table, Tag, Space, Modal, Button, Form, Input, DatePicker, InputNumber, notification} from 'antd';
import {get, post} from "../../api/services";
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
                        _id: row._id,
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
    const Accept = async (data) => {
        let res = await post(API_URLS.cards.status,{_id:data?._id, status:"Accepted"});
        openNotificationWithIcon('success', res.data.message)
        setCount(count+1);
    };
    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message,
        });
    };
    const Reject =async (data) => {
        let res = await post(API_URLS.cards.status,{_id:data?._id, status:"Rejected"});
        console.log(res.data);
        openNotificationWithIcon('success', res.data.message)
        setCount(count+1);
    };
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
                <>
                    <Button type="primary" className='Action' onClick={()=>Accept(record)}> Accept</Button>
                    <Button type="primary" className='Action' onClick={()=>Reject(record)}> Reject</Button>
                </>
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
