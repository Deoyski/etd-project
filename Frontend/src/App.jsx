import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import CorpseData from "./Components/CorpseData";
import Question from "./Components/Question";
import TestResult from "./Components/TestResult";
import AdminDashboard from "./Components/AdminDashboard";
import AdminTableInterval from "./Components/AdminInterval";
import AdminCiriJenazah from "./Components/AdminCiriJenazah";
import AdminRuleBase from "./Components/AdminRuleBase";
import AdminMessage from "./Components/AdminMessage";
import Message from "./Components/Message";
import TableHistory from "./Components/TableHistory";
import AdminRiwayat from "./Components/AdminRiwayat";
import AdminUser from "./Components/AdminUser";

function App() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <Router>
      <Routes> 
        <Route path="/" element={<Login />} />

        {/* Tenaga Medis */}
        {token && role !== 'admin' && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/corpse_data" element={<CorpseData />} />
            <Route path="/question" element={<Question/>} />
            <Route path="/test_result" element={<TestResult/>} />
            <Route path="/tbl_history" element={<TableHistory/>} />
            <Route path="/message" element={<Message/>} />
          </>
        )}
        {/* Admin */}
        {token && role === 'admin' && (
          <>
            <Route path="/admin_dashboard" element={<AdminDashboard/>} />
            <Route path="/admin_tbl_interval" element={<AdminTableInterval/>} />
            <Route path="/admin_tbl_ciri" element={<AdminCiriJenazah/>} />
            <Route path="/admin_rule_base" element={<AdminRuleBase/>} />
            <Route path="/admin_tbl_message" element={<AdminMessage/>} />
            <Route path="/admin_tbl_riwayat" element={<AdminRiwayat/>} />
            <Route path="/admin_tbl_user" element={<AdminUser/>} />
          </>
        )}

          {token && role === 'master' && (
          <>
            <Route path="/admin_dashboard" element={<AdminDashboard/>} />
            <Route path="/admin_tbl_interval" element={<AdminTableInterval/>} />
            <Route path="/admin_tbl_ciri" element={<AdminCiriJenazah/>} />
            <Route path="/admin_rule_base" element={<AdminRuleBase/>} />
            <Route path="/admin_tbl_message" element={<AdminMessage/>} />
            <Route path="/admin_tbl_riwayat" element={<AdminRiwayat/>} />
            <Route path="/admin_tbl_user" element={<AdminUser/>} />
          </>
        )}  
      </Routes>
    </Router>
  );
}

export default App;
