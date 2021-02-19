import { NextApiHandler } from "next"
import { getInstance } from "helpers/axios"
import { handleApiError } from "helpers/api-utils"

const addPin: NextApiHandler = async (req, res) => {
    const axios = getInstance(req.headers.authorization)
    try {
        await axios.post(`/add-pin`, req.body)
    } catch (e) {
        handleApiError(e, res)
        return
    }

    res.send("")
}

export default addPin
