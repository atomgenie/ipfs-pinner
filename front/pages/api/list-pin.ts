import { NextApiHandler } from "next"
import { PinInterface } from "types/pin"
import { handleApiError } from "helpers/api-utils"

import { getInstance } from "helpers/axios"

const listPin: NextApiHandler<PinInterface[]> = async (req, res) => {
    let response
    const axios = getInstance(req.headers.authorization)

    try {
        response = await axios.get(`/list-pin`)
    } catch (e) {
        handleApiError(e, res)
        return
    }

    res.send(
        response.data.map(
            (elm: any, pos: number): PinInterface => ({
                hash: elm.hash,
                id: `${pos}`,
                name: elm.name,
            }),
        ),
    )
}

export default listPin
