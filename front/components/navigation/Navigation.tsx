import React from "react"

import { Menu } from "antd"

interface props {}

export const WithNavigation: React.FC<props> = ({ children }) => {
    return (
        <div className="flex items-stretch flex-1">
            <div className="flex-shrink-0 flex flex-col shadow-sm">
                <h1 className="text-lg p-4 text-blue-700 font-bold border-r">
                    IPFS Pinner
                </h1>
                <Menu className="w-64 flex-grow" title="IPFS Pinner" mode="inline">
                    <Menu.Item>Home</Menu.Item>
                </Menu>
            </div>
            <div className="flex-grow bg-gray-50">{children}</div>
        </div>
    )
}
