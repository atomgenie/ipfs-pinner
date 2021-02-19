import React, { useCallback, useEffect, useState } from "react"

import { PinInterface } from "types/pin"

import { Button, Table } from "antd"
import { useToken } from "components/token"
import axios from "axios"
import { triggerRefresh, useRefresh } from "helpers/refresher"

interface props {}

interface pinColumns {
    key: string
    hash: string
    name: string
}

const columns = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Hash",
        dataIndex: "hash",
        key: "hash",
    },
    {
        title: "Actions",
        dataIndex: "key",
        key: "actions",
        render: (elm: string) => (
            <>
                <Button type="primary" danger>
                    Delete
                </Button>
            </>
        ),
    },
]

export const Pins: React.FC<props> = () => {
    const [pins, setPins] = useState<pinColumns[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>("")

    const token = useToken()

    const getList = useCallback(async () => {
        setLoading(true)
        setError("")

        let res
        try {
            res = await axios.get("/api/list-pin", {
                headers: { Authorization: `Bearer ${token}` },
            })
        } catch (e) {
            setError(e.message || e)
            setLoading(false)
            return
        }
        const data: PinInterface[] = res.data

        const pinsMap = data.map(pin => {
            const { id, ...pinElm } = pin
            return {
                ...pinElm,
                key: id,
            }
        })

        setPins(pinsMap)
        setLoading(false)
    }, [token])

    useEffect(() => {
        getList()
    }, [getList])

    useRefresh(getList)

    const handleDelete = async (key: string) => {
        setLoading(true)
        const hash = pins.find(pin => pin.key === key)
        if (hash !== undefined) {
            try {
                await axios.delete("/api/remove-pin", {
                    headers: { Authorization: `Bearer ${token}` },
                    data: { hash: hash.hash },
                })
            } catch {}

            triggerRefresh()
        }
        setLoading(false)
    }

    return (
        <div className="flex flex-col gap-4">
            <div>
                <Button onClick={() => getList()} loading={loading}>
                    Refresh
                </Button>
            </div>
            <Table dataSource={pins} loading={loading}>
                <Table.Column title="Name" dataIndex="name" key="name"></Table.Column>
                <Table.Column title="Hash" dataIndex="hash" key="hash"></Table.Column>
                <Table.Column
                    title="Actions"
                    dataIndex="key"
                    key="actions"
                    render={(key: string) => (
                        <>
                            <Button
                                type="primary"
                                danger
                                onClick={() => handleDelete(key)}
                            >
                                Delete
                            </Button>
                        </>
                    )}
                ></Table.Column>
            </Table>
        </div>
    )
}
