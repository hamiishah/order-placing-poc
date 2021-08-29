import React from 'react';
import './header.css'
import { useHistory } from "react-router-dom";
import { notification, Space } from 'antd';
import {logout} from '../../../api/services';

const Heeader =()=>{
    const history = useHistory();
    const openNotificationWithIcon = type => {
        history.push("/");
        notification[type]({
            message: 'Logout Successfully',
        });
    };
    return(
        <>
            <header className="p-3 mb-3 bg-light border-bottom">
                <div className="container">
                    <div
                        className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><a href="#" className="nav-link px-2 link-secondary">Overview</a></li>
                            <li><a href="#" className="nav-link px-2 link-dark">Inventory</a></li>
                            <li><a href="#" className="nav-link px-2 link-dark">Customers</a></li>
                            <li><a href="#" className="nav-link px-2 link-dark">Products</a></li>
                        </ul>

                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                            <input type="search" className="form-control" placeholder="Search..." aria-label="Search"/>
                        </form>

                        <div className="dropdown text-end">
                            <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle"
                               id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32"
                                     className="rounded-circle"/>
                            </a>
                            <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                                <li><a className="dropdown-item" href="#">Profile</a></li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li><a className="dropdown-item" onClick={() => openNotificationWithIcon('success')}>Sign out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>

        </>
    )
}
export default Heeader
