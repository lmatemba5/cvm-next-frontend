import axios from "@/lib/apiurl"
import cookie from 'cookie'

export default async (req, res) => {
    if (req.method !== "POST") {
        res.status(405).json({
            error: `Method ${req.method} not allowed, only POST method is allowed for this route`
        })
    }

    const bearer = cookie.parse(req.headers.cookie ?? '')
    const authorization = {
        headers: {
            Authorization: bearer?.token
        }
    }

    try {
        let response = await axios.post('/api/logout', {}, authorization)
        console.log(response.data)
        if (response.status === 200) {
            res.setHeader('Set-Cookie', [
                cookie.serialize(
                    'token', ``,
                    {
                        httpOnly: true,
                        sameSite: "strict",
                        secure: process.env.NODE_ENV !== 'development',
                        path: '/api'
                    }
                )
            ])

            return res.status(200).json(response.data)

        }

        res.status(response.status).json(response.data)

    } catch (err) {
        res.status(500).json(err)
    }

}
