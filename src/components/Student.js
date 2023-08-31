import React from "react";
import { useNavigate } from "react-router-dom";

const Student = ({ student, deleteStudent }) => {
  const navigateStudent = useNavigate();
  const editStudent = (e, id) => {
    e.preventDefault();
    navigateStudent(`/editStudent/${id}`);
  };

  return (
    <tr className="border-solid border-2 border-black-600 bg-gray-50" key={student.id}>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{student.firstname}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{student.lastname}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{student.email}</div>
      </td>
      <td className="text-right px-6 py-4 whitespace-nowrap font-medium text-sm">
        <button 
          onClick={(e, id) => editStudent(e, student.id)}
          className="rounded text-white font-semibold bg-green-500 hover:bg-green-900 py-2 px-6">
          Edit
        </button>
        <button
          onClick={(e, id) => deleteStudent(e, student.id)}
          className="rounded text-white font-semibold bg-red-500 hover:bg-red-900 py-2 px-6 mx-8">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Student;
