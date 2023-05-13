import axios from "axios"

export default axios.create({
    baseURL: process.env.NEXT_PUBLIC_PROXY_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    withCredentials: true
})
