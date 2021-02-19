import { handleApiError } from "helpers/api-utils"
import { getInstance } from "helpers/axios"
import { NextApiHandler } from "next"

const removePin: NextApiHandler = async (req, res) => {
    const axios = getInstance(req.headers.authorization)

    try {
        await axios.delete("/delete-pin", { data: req.body })
    } catch (e) {
        handleApiError(e, res)
        return
    }

    res.status(200).end()
}

export default removePin
