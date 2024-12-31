const saveUserLocal =(user:unknown)=>{
    localStorage.setItem('user', JSON.stringify(user));
}

const getUserLocal =() => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

const removeUserLocal = () => {
    localStorage.removeItem('user');
}

export {
    saveUserLocal,
    getUserLocal,
    removeUserLocal
}