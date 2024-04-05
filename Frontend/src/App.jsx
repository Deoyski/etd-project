import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import TableInterval from "./Components/TableInterval";
import CorpseData from "./Components/CorpseData";
import Question from "./Components/Question";
import TestResult from "./Components/TestResult";
import TableCiriJenazah from "./Components/TableCiriJenazah";
import AdminDashboard from "./Components/AdminDashboard";
import AdminTableInterval from "./Components/AdminInterval";
import AdminCiriJenazah from "./Components/AdminCiriJenazah";
import AdminUserTable from "./Components/AdminUserTable";
import AdminRuleBase from "./Components/AdminRuleBase";
import AdminMessage from "./Components/AdminMessage";
import Message from "./Components/Message";
import TableHistory from "./Components/TableHistory";

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/login" element={<Login />} />
        
        {/* Tenaga Medis */}
        <Route path="/" element={<Home />} />
        <Route path="/corpse_data" element={<CorpseData />} />
        <Route path="/question" element={<Question/>} />
        <Route path="/test_result" element={<TestResult/>} />
        <Route path="/tbl_history" element={<TableHistory/>} />
        <Route path="/tbl_interval" element={<TableInterval />} />
        <Route path="/tbl_ciri" element={<TableCiriJenazah/>} />
        <Route path="/message" element={<Message/>} />

        {/* Admin */}
        <Route path="/admin_dashboard" element={<AdminDashboard/>} />
        <Route path="/admin_tbl_interval" element={<AdminTableInterval/>} />
        <Route path="/admin_tbl_ciri" element={<AdminCiriJenazah/>} />
        <Route path="/admin_rule_base" element={<AdminRuleBase/>} />
        <Route path="/admin_tbl_user" element={<AdminUserTable/>} />
        <Route path="/admin_tbl_message" element={<AdminMessage/>} />
      </Routes>
    </Router>
  );
}

export default App;
