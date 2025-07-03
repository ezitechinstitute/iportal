import "react-calendar/dist/Calendar.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register";
import EmailVerified from "./components/EmailVerified";
import {InternHome} from "./pages/InternHome";
// import { Information } from "./pages/Information";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route index path="/" element={<Register />} />
          <Route path="/email-verified" element={<EmailVerified />} />
          {/* <Route path="/information" element={<Information />} /> */}

          {/* Index Routes */}
           <Route exact path="/intern-dashboard" element={<InternHome />} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
