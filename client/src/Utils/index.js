const TOKEN_KEY = 'jwt';

export const login = (user) => {
    alert(JSON.stringify(user))
    localStorage.setItem(TOKEN_KEY, 'TestLogin');
}

export const logout = () => {
    localStorage.clear();
}

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }

    return false;
}
