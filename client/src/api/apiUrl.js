const apiBaseUrl = process.env.REACT_APP_SERVER_URL;

const API_URLS = {
    login: `${apiBaseUrl}/auth/login`,
    Reset: {
        forgetpassword:`${apiBaseUrl}/auth/reset-password`,
        changepassword:`${apiBaseUrl}/change-password`,
       },
    users: {
        add: `${apiBaseUrl}/user-add`,
        edit: `${apiBaseUrl}/user-edit`,
        delete: `${apiBaseUrl}/user-delete`,
        list: `${apiBaseUrl}/users`,
        get: `${apiBaseUrl}/user`
    },
    cards: {
        add: `${apiBaseUrl}/card-add`,
        list: `${apiBaseUrl}/card-list`,
        status:`${apiBaseUrl}/order-status`,
        orderDetail:`${apiBaseUrl}/card-detail`,
    }

}

export default API_URLS
