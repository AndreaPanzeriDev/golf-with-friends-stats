
import { useState } from "react";
import Sidebar from "./Sidebar";
import Friends from "../../pages/Friends";
import Dashboard from "../../pages/Dashboard";



function MainLayout() {
    const [currentPage, setCurrentPage] = useState<string>('dashboard');
    let render;

    switch(currentPage){
        case "friends":
            render =  <Friends />
            break;
        default:
            render = <Dashboard />
    }

    return (
        <div className="flex!">
            <Sidebar currentPage={currentPage} action={setCurrentPage} />
            <div className="flex-1">
                {render}
            </div>
        </div>
    )

}

export default MainLayout;