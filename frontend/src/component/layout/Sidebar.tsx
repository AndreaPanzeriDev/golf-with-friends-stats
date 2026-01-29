import { Button, Flex, Typography } from "antd";
import { Bolt, Calendar, LayoutDashboard, MapPinned, UserRound } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PageProps {
    currentPage: string,
    action: (setCurrentPage: string) => void
}

function Sidebar({ currentPage, action: setCurrentPage }: PageProps) {
    const { t } = useTranslation('sidebar');

    /**
     * start style
     */
    const baseButtonStyle = "flex! items-center! justify-start! h-12 w-56 border-none! shadow-none! text-gray-500 text-lg p-5! rounded-xl transition-all hover:bg-[#E6EDE9]! hover:text-[#2C4A39]!"
    /**
     * end style
     */
    return (
        <div className="h-screen w-68 border-r border-gray-200">
            <div className="flex items-center justify-center py-3">
                <div className="bg-[#2c6141] rounded-full h-11 w-11 justify-center flex items-center mr-3"><span className="text-2xl">⛳</span></div>
                <div>
                    <Typography.Title level={4} style={{ margin: 0, fontFamily: 'serif' }}>
                        {t("golf-stats")}
                    </Typography.Title>
                    <Typography.Text type="secondary" style={{ fontSize: '13px', color: '#677e73' }}>
                        {t("with-friends")}
                    </Typography.Text>
                </div>


            </div>
            <hr className="border-t border-gray-200" />
            <div className="flex! flex-1! flex-col! justify-between! items-center! py-6!">
                <div className="flex! flex-col!">
                    <Button className={`${baseButtonStyle}`}><LayoutDashboard />Dashboard</Button>
                    <Button className={`${baseButtonStyle}`}><UserRound />Friends</Button>
                    <Button className={`${baseButtonStyle}`}><MapPinned />Course</Button>
                    <Button className={`${baseButtonStyle}`}><LayoutDashboard />Games</Button>
                    <Button className={`${baseButtonStyle}`}><Calendar />Calendar</Button>
                </div>
                <Button className={`${baseButtonStyle}`}><Bolt />Settings</Button>
            </div>
        </div>)
}

export default Sidebar;