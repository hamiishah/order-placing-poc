import {Button, Card} from 'antd';
import Header from '../header/index'
import '../layout.css'
import {Link,useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import API_URLS from '../../../api/apiUrl';
import {post} from "../../../api/services";
import {LeftOutlined} from "@ant-design/icons";

const Profile =()=>{
    const history = useHistory();
    const [cards,setCards] = useState({})
    const [response,setResponse] = useState(null)
    const [count, setCount] = useState(0);
    const getUser = async ()=>{
        try{
            let res = await post(API_URLS.users.get);
            setCards(res.data.data);
        } catch (e){
            setResponse(e.message)
            // console.log("E data", )
        }
    }
    useEffect( () => {
        getUser();
        // onFinish();
    }, [count+1]);
    return(
        <>
            <Header/>
            <div className='px-5'>
                <Button className="my-4" type="primary" onClick={() => history.goBack()}>
                    <LeftOutlined />Back to main page
                </Button>
                <Card title="Profile Page">
                    <Card
                        style={{ marginTop: 16 }}
                        type="inner"
                        title="User Detail"
                    >
                        <h5>User FirstName: <span className='email'>{cards.firstName? cards.firstName :"not available"}</span></h5>
                        <h5>User LastName: <span className='email'>{cards.lastName? cards.lastName :"not available"}</span></h5>
                        <h5>User Email: <span className='email'>{cards.email? cards.email :"not available"}</span></h5>
                        <span className="float-end"><Link to="/resetpassword" className="Link">Change Password</Link></span>
                    </Card>
                </Card>
            </div>
        </>
    )
}
export default Profile