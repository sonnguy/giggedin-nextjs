
const getUserDateFromStrorage = () => {
    const data = localStorage.getItem('USER_DATA');
    return data ? JSON.parse(data) : null;
}

export { getUserDateFromStrorage }

