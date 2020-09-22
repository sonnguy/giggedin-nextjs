export function authHeader() {
    let user = JSON.parse(localStorage.getItem('USER_DATA'))
    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token }
    } else {
        return {}
    }
}