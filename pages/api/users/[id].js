import axios from "@/lib/apiurl"
import cookie from 'cookie'

const allowed_methods = ['PUT', 'DELETE', 'GET']

export default async (req, res) => {
    if (!allowed_methods.includes(req.method)) {
        return res.status(405).json({
            error: `method ${req.method} not allowed`
        })
    }

    const bearer = cookie.parse(req.headers.cookie ?? '')
    const authorization = {
        headers: {
            Authorization: bearer?.token
        }
    }

    //user id
    const { id } = req.query

    if (req.method === 'PUT') {

        try {
            const apiRes = await axios.post(`/api/users/${id}`, { ...req.body, _method: 'PUT' }, authorization)

            const data = apiRes.data

            if (apiRes.status === 200) {
                res.status(200).json({ user: data.data })
            } else {
                res.status(apiRes.status).json(data)
            }

        } catch (error) {
            res.status(500).json(error)
        }
    } else if (req.method === 'DELETE') {

        try {
            const apiRes = await axios.delete(`/api/users/${id}`, authorization)

            const data = apiRes.data

            if (apiRes.status === 200) {
                res.status(200).json(data.data)
            } else {
                res.status(apiRes.status).json(data)
            }

        } catch (error) {
            res.status(500).json(error)
        }
    } else {

        try {
            const apiRes = await axios.get(`/api/users/${id}`, authorization)

            const data = apiRes.data

            if (apiRes.status === 200) {
                res.status(200).json(data.data)
            } else {
                res.status(apiRes.status).json(data)
            }

        } catch (error) {
            res.status(500).json(error)
        }
    }
}
