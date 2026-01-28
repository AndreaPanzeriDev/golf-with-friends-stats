import { Typography } from "antd";

interface PageProps {
    currentPage: string,
    action: (setCurrentPage: string) => void
}

function Sidebar({ currentPage, action: setCurrentPage }: PageProps) {
    return (
        <div className="h-screen w-68 border-r border-gray-200">
            <div className="flex items-center justify-center py-3">
                <div className="bg-[#2c6141] rounded-full h-11 w-11 justify-center flex items-center mr-3"><span className="text-2xl">⛳</span></div>
                <div>
                    <Typography.Title level={4} style={{ margin: 0, fontFamily: 'serif' }}>
                        GolfStats
                    </Typography.Title>
                    <Typography.Text type="secondary" style={{ fontSize: '13px', color: '#677e73' }}>
                        with friends
                    </Typography.Text>
                </div>


            </div>
            <hr className="border-t border-gray-200" />
        </div>)
}

export default Sidebar;