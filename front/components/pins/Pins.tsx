import React, { useEffect, useState } from "react"

import { PinInterface } from "types/pin"

import { Button, Table } from "antd"

interface props {}

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
    const [pins, setPins] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>("")

    useEffect(() => {
        setLoading(true)

        fetch("/api/list-pin")
            .then(async res => {
                const data: PinInterface[] = await res.json()

                const pinsMap = data.map(pin => {
                    const { id, ...pinElm } = pin
                    return {
                        ...pinElm,
                        key: id,
                    }
                })

                setLoading(false)
                setPins(pinsMap)
            })
            .catch(e => {
                setLoading(false)
                setError(e.message || e)
            })
    }, [])

    return <Table dataSource={pins} columns={columns}></Table>
}
