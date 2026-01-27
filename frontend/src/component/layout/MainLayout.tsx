import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

interface PageProps {
    currentPage: string,
    action: (setCurrentPage: string) => void;
}

function MainLayout({currentPage, action: setCurrentPage}: PageProps){
    
    return (
        <Layout style={{height: "100%"}}>
            <Sider width="20%">{currentPage}</Sider>
            <Layout>
                <Header>header</Header>
                <Content>content</Content>
                <Footer>footer</Footer>
            </Layout>
        </Layout>
    )
    
}

export default MainLayout;