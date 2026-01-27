import { useState } from "react";
import MainLayout from "./component/layout/MainLayout";


function App() {

  const [currentPage, setCurrentPage] = useState<string>('dashboard');



  switch (currentPage) {
    case 'dashboard':
      <p>Dashboard</p>
      break;
    default:
      <p>Page not found</p>

  }


  return (
    <MainLayout currentPage={currentPage} action={setCurrentPage}>
    </MainLayout>
  );
}

export default App;