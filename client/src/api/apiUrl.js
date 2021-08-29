const apiBaseUrl = process.env.REACT_APP_SERVER_URL;

const API_URLS = {
    login: `${apiBaseUrl}/auth/login`,
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
    }

}

export default API_URLS
