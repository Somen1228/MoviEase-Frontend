
import axios from 'axios';

export const axiosInstance = axios.create({
    headers: {
        'Content-type': "application/json",
        'x-access-token': `Bearer ${localStorage.getItem("token")}`
    }
})
