import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AddStudent from "./components/AddStudent";
import StudentList from "./components/StudentList";
import Navbar from "./components/Navbar";
import UpdateStudent from "./components/UpdateStudent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<StudentList />} />
          <Route path="/" element={<StudentList />}></Route>
          <Route path="/studentList" element={<StudentList />} />
          <Route path="/addStudent" element={<AddStudent />} />
          <Route path="/editStudent/:id" element={<UpdateStudent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
