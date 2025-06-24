import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminUsers = () => {
  const [rows, setRows] = useState([]);
  const [batch, setBatch] = useState("");

  useEffect(() => {
    if (!batch) {
      setRows([]);
      return;
    }

    // ✅ Full URL for local dev OR add proxy
    fetch(`http://localhost:7007/api/admin-users?batch=${batch}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(setRows)
      .catch((err) => {
        console.error("Error fetching admin user data:", err);
        setRows([]);
      });
  }, [batch]);

  return (
    <>
      <header className="dashboard-header">
        <div className="header-controls">
          <select value={batch} onChange={(e) => setBatch(e.target.value)}>
            <option value="">Select batch</option>
            <option value="2022-26">2022-26</option>
            <option value="2023-27">2023-27</option>
            <option value="2024-28">2024-28</option>
            <option value="2025-29">2025-29</option>
          </select>

          <Link className="addButton" to="/add-passkey">Add Passkey</Link>
          <Link className="addButton" to="/add-question">Add Question</Link>
        </div>
      </header>

      {rows.length > 0 && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {["Name", "Email", "Contact No.", "Roll No", "Branch", "Batch", "Score", "Attempts"].map((h) => (
               <th key={h}>{h}</th>
                ))}

              </tr>
            </thead>
           <tbody>
  {rows.map((r) => (
    <tr key={r.id}>
      <td>{r.name}</td>
      <td>{r.email}</td>
      <td>{r.contact}</td>
      <td>{r.rollNumber}</td>
      <td>{r.branch}</td>
      <td>{r.batch}</td>
      <td>{r.totalScore}</td>
      <td>{r.totalAttempts}</td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default AdminUsers;
