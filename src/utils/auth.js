export const checkUserAuthenticated = async () => {
    try {
        const token = localStorage.getItem('Accesstoken');
        
        // console.log('token:', token.length());
        console.log('token type:', typeof token);
        console.log('token:', token);
        if (!token) {
            return false;
        }
        const response = await fetch('http://localhost:8000/api/auth-check/', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            const data = await response.json();
            return data.authenticated;
        } else {
            if (response.status === 401) {
                // Token is invalid or expired
                // localStorage.removeItem('Accesstoken');
            }
            return false;
        }
    } catch (error) {
        return false;
    }
};
