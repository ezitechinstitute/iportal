import "bootstrap/dist/css/bootstrap.min.css";
import { AdminSidebar } from "./components/admin-components/AdminSidebar";
import { AdminDashboard } from "./pages/admin-pages/AdminDashboard";

function App() {
  return (
    <>
      <AdminSidebar />
      <AdminDashboard />
      <br/>
    </>
  );
}

export default App;
