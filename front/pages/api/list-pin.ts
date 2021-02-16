import { NextApiHandler } from "next"
import { PinInterface } from "types/pin"

const listPin: NextApiHandler<PinInterface[]> = async (req, res) => {
    res.status(200).json([{ hash: "unhash", name: "HomeName", id: "2" }])
}

export default listPin
