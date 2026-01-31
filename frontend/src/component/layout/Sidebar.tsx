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
    const baseButtonStyle = "flex! items-center! justify-start! h-12 w-56 border-none! shadow-none! text-gray-500 text-lg p-5! rounded-xl transition-all hover:bg-[#E6EDE9]! hover:text-[#2C4A39]! my-1.5!"
    const activeButton = "bg-[#20553b]! text-white!"
    /**
     * end style
     */
    return (
        <div className="h-screen flex! flex-col! w-68 border-r border-gray-200">
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
            <div className="flex! flex-col! items-center justify-between! flex-auto!">
                <div className="flex! flex-col!">
                    <Button onClick={() => setCurrentPage("dashboard")} className={`${baseButtonStyle} ${currentPage == "dashboard" ? activeButton : ""} `}><LayoutDashboard />Dashboard</Button>
                    <Button onClick={() => setCurrentPage("friends")} className={`${baseButtonStyle} ${currentPage == "friends" ? activeButton : ""}`}><UserRound />Friends</Button>
                    <Button onClick={() => setCurrentPage("courses")} className={`${baseButtonStyle} ${currentPage == "courses" ? activeButton : ""}`}><MapPinned />Courses</Button>
                    <Button onClick={() => setCurrentPage("games")} className={`${baseButtonStyle} ${currentPage == "games" ? activeButton : ""}`}><LayoutDashboard />Games</Button>
                    <Button onClick={()=>setCurrentPage("dashboard")} className={`${baseButtonStyle} ${currentPage == "calendar" ? activeButton : ""}`}><Calendar />Calendar</Button>
                </div>
                <Button onClick={()=>setCurrentPage("settings")} className={`${baseButtonStyle} ${currentPage == "settings" ? activeButton : ""}` }><Bolt />Settings</Button>
            </div>
        </div>)
}

export default Sidebar;