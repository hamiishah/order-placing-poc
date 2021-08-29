import React, {useState, useEffect} from 'react';
import '../User/index.css'
import { useHistory } from "react-router-dom";
import Header from '../Page/header'
import {Space, Table, Tag,Button} from 'antd';
import {LeftOutlined} from "@ant-design/icons";
import API_URLS from "../../api/apiUrl";
import axios from 'axios'

const Layout = () => {
    const history = useHistory();
    const [state, setstate] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setloading] = useState(true);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
       let res= await axios.get(API_URLS.cards.list).then(
           res => {
               console.log(res.data.data)
                setloading(false);
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
    ];

    return (
        <div>
            <div>
                <Header/>
            </div>
            <div className="table">
                <Button type="primary" onClick={() => history.goBack()}>
                    <LeftOutlined />Back to main page
                </Button>
                <Table columns={columns} dataSource={state} />
            </div>
        </div>
    );
};
export default Layout;
