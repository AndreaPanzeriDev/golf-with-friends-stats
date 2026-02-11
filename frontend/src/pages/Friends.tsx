import { Button } from "antd";
import NavBar from "../component/layout/NavBar";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import FriendsList from "../component/FriendsList";

function Friends() {

    const { t } = useTranslation("navbar");

    //** DA RIMUOVERE */
    const borderSyle = "border-4 border-amber-800"
    //** DA RIMUOVERE */


    return (
        <div className="flex flex-col h-full">
            <NavBar navbarName="Friends List" additionalComponent={<Button className="text-white! bg-[#20553b]! border-none! ml-3!"><Plus color="white" size={16} />{t("addFriend")}</Button>} />
            <div className={`${borderSyle} w-full flex-1`}>
                <FriendsList />
            </div>
        </div>

    )
}

export default Friends;