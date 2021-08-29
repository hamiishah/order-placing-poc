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
    const [loading, setloading] = useState(true);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        await axios.get(API_URLS.user).then(
            res => {
                setloading(false);
                setstate(
                    res.data.map(row => ({
                        Name: row.name,
                        Email: row.Email,
                        City: row.City,
                    }))
                );
            }
        );
    };
    const columns = [
        {
            title: 'Name',
            dataIndex: 'Name',
            width: 150
        },
        {
            title: "Email",
            dataIndex: "Email",
            width: 150
        },
        {
            title: "City",
            dataIndex: "City",
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
