import axios from "@/lib/apiurl"
import cookie from 'cookie'

export default async (req, res) => {
    if (req.method !== "GET") {
        return res.status(405).json({
            error: `Method ${req.method} not allowed, only GET method is allowed for this route`
        })
    }

    const bearer = cookie.parse(req.headers.cookie ?? '')

    try {
        const apiRes = await axios.get('/api/user', {
            headers: {
                Authorization: bearer?.token
            }
        })

        const data = apiRes.data

        if (apiRes.status === 200) {
            return res.status(200).json(data.data)
        }

        return res.status(apiRes.status).json({ error: apiRes.statusText })

    } catch (error) {
        return res.status(bearer?.token ? 500 : 401).json(error)
    }
}
