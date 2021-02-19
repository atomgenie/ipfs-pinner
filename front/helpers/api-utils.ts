import { NextApiResponse } from "next"

export const handleApiError = (error: any, res: NextApiResponse) => {
    if (error?.response?.status) {
        res.status(error.response.status).end()
    } else {
        res.status(500).end()
    }
}
