import axios from "axios";

const token = sessionStorage.getItem('token')
    
const apiInstance = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    headers: {
      'authorization': `Bearer ${token}` ,
      'Content-Type': 'application/json'
    }
});

export default apiInstance