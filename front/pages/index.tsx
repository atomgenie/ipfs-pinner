import { Button, Form, Input, PageHeader } from "antd"

import { useSetToken, useToken } from "components/token"

import { Pins } from "components/pins"
import { useEffect, useState } from "react"
import axios from "axios"
import { triggerRefresh } from "helpers/refresher"

const Home = () => {
    const setToken = useSetToken()
    const token = useToken()

    const [localToken, setLocalToken] = useState<string>("")
    const [addPinLoading, setAddPinLoading] = useState(false)

    useEffect(() => {
        setLocalToken(token)
    }, [token])

    const handleSetToken = () => {
        setToken(localToken)
    }

    const handleAddPin = async (values: { hash: string; name: string }) => {
        setAddPinLoading(true)
        try {
            await axios.post(
                "/api/add-pin",
                { hash: values.hash, name: values.name },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
        } catch {}
        setAddPinLoading(false)

        triggerRefresh()
    }

    return (
        <>
            <PageHeader title="Home" subTitle="Manage yours IPFS pins" />
            <div className="container mx-auto">
                <div className="flex flex-col gap-4 m-2">
                    <div className="flex gap-4 items-center">
                        <Input
                            type="password"
                            placeholder="Token"
                            size="large"
                            className="shadow-sm"
                            value={localToken}
                            onChange={e => setLocalToken(e.target.value)}
                        />
                        <Button type="primary" onClick={() => handleSetToken()}>
                            Apply
                        </Button>
                    </div>
                    <div className="flex">
                        <div className="bg-white rounded shadow-sm px-4 py-2 border flex gap-4 items-center">
                            <div>
                                Status: <b>Running</b>
                            </div>
                            <Button type="primary" danger>
                                Stop
                            </Button>
                        </div>
                    </div>
                    <div className="bg-white rounded shadow-sm border px-4 py-2 flex flex-col gap-4">
                        <div className="text-base font-bold">Add pin</div>
                        <Form onFinish={handleAddPin}>
                            <Form.Item name="name">
                                <Input placeholder="Name" />
                            </Form.Item>
                            <Form.Item
                                name="hash"
                                rules={[
                                    { required: true, message: "Please insert a hash" },
                                ]}
                            >
                                <Input placeholder="Hash" />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={addPinLoading}
                                >
                                    Pin
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="bg-white rounded shadow-sm border px-4 py-2 flex flex-col gap-4">
                        <div className="text-base font-bold">Pins</div>
                        <div>
                            <Pins></Pins>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
