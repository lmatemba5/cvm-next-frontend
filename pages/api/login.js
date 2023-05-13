import axios from "@/lib/apiurl"
import cookie from 'cookie'

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: `Method ${req.method} not allowed, only POST method is allowed for this route`
    })
  }

  const { email, password } = req.body

  try {

    const apiRes = await axios.post('/api/login', { email, password })
    const data = apiRes.data

    if (apiRes.status === 200) {

      if (data?.data.success === undefined) {
        res.setHeader('Set-Cookie', [
          cookie.serialize(
            'token', `Bearer ${data.data.token}`,
            {
              httpOnly: true,
              sameSite: "strict",
              secure: process.env.NODE_ENV !== 'development',
              path: '/api'
            }
          )
        ])

        res.status(200).json({ success: true })
      } else {
        res.status(501).json({ message: data.data.message })
      }
    }

    res.status(apiRes.status).json({ success: false })

  } catch (error) {
    res.status(500).json(error)
  }
}
