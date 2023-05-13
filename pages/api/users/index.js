import axios from "@/lib/apiurl"
import cookie from 'cookie'

const allowed_methods = ['GET', 'POST']

export default async (req, res) => {
    if (!allowed_methods.includes(req.method)) {
        return res.status(405).json({
            error: `Method ${req.method} not allowed, only GET,POST to this route`
        })
    }

    const bearer = cookie.parse(req.headers.cookie ?? '')
    const authorization = {
        headers: {
            Authorization: bearer?.token
        }
    }

    if (req.method === 'GET') {

        try {
            const apiRes = await axios.get('/api/users', authorization)

            const data = apiRes.data

            if (apiRes.status === 200) {
                return res.status(200).json(data.data)
            }

            return res.status(apiRes.status).json({ error: apiRes.statusText })

        } catch (error) {
            return res.status(500).json(error)
        }
    } else if (req.method === 'POST') {
        try {
            const apiRes = await axios.post('/api/users', req.body, authorization)

            const data = apiRes.data

            if (apiRes.status === 201) {
                return res.status(201).json(data)
            }

            return res.status(apiRes.status).json(data)

        } catch (error) {
            return res.status(500).json({ error: error.response.data.message })
        }
    }
}
