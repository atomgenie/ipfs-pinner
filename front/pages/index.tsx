import { Button, Form, Input, PageHeader } from "antd"

import { Pins } from "components/pins"

const Home = () => {
    return (
        <>
            <PageHeader title="Home" subTitle="Manage yours IPFS pins" />
            <div className="container mx-auto">
                <div className="flex flex-col gap-4 m-2">
                    <div className="shadow-sm">
                        <Input type="password" placeholder="Token" size="large" />
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
                        <Form>
                            <Form.Item
                                name="hash"
                                rules={[
                                    { required: true, message: "Please insert a hash" },
                                ]}
                            >
                                <Input placeholder="Hash" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
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
