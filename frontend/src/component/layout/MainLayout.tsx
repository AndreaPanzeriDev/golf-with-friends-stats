
import Sidebar from "./Sidebar";

interface PageProps {
    currentPage: string,
    action: (setCurrentPage: string) => void;
}

function MainLayout({ currentPage, action: setCurrentPage }: PageProps) {

    return (
        <div>
            <Sidebar currentPage={currentPage} action={setCurrentPage} />

        
        </div>
    )

}

export default MainLayout;