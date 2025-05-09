import React from 'react';


const users = [
  {
    id: 1,
    name: 'Jane Cooper',
    email: 'jessica.hanson@example.com',
    contact: '8855442266',
    date: '12-Dec-24',
    tcn: '8855-2266',
    status: 'Verified',
    avatar: 'JC',
  },
  {
   id: 2,
   name: 'Jane Cooper',
   email: 'jessica.hanson@example.com',
   contact: '8855442266',
   date: '12-Dec-24',
   tcn: '8855-2266',
   status: 'Verified',
   avatar: 'JC',
 },
 {
  id: 3,
  name: 'Jane Cooper',
  email: 'jessica.hanson@example.com',
  contact: '8855442266',
  date: '12-Dec-24',
  tcn: '8855-2266',
  status: 'Verified',
  avatar: 'JC',
},
{
 id: 4,
 name: 'Jane Cooper',
 email: 'jessica.hanson@example.com',
 contact: '8855442266',
 date: '12-Dec-24',
 tcn: '8855-2266',
 status: 'Verified',
 avatar: 'JC',
},
  {
    id: 5,
    name: 'Wade Warren',
    email: 'willie.jennings@example.com',
    contact: '8855442266',
    date: '12-Dec-24',
    tcn: '8855-2266',
    status: 'Not Verified',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  // Add more users as needed...
];

const UserTable = () => {
  return (
    <div className="user-table-container">
      <div className="table-header">
        <h2>TIT College Test Submission</h2>
        <div className="user-actions">
          <input type="text" placeholder="Search here" />
          <button className="filter-btn">Filter By Date</button>
          <div className="filter-options">
            <button className="verified">Verified</button>
            <button className="not-verified">Non-Verified</button>
          </div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Full Name</th>
            <th>E-mail</th>
            <th>Contact</th>
            <th>Account Creation Date</th>
            <th>TCN Number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr key={u.id}>
              <td>{index + 1}</td>
              <td className="name-cell">
                {u.avatar.startsWith('http') ? (
                  <img src={u.avatar} alt="avatar" className="avatar" />
                ) : (
                  <div className="avatar-text">{u.avatar}</div>
                )}
                {u.name}
              </td>
              <td>{u.email}</td>
              <td>{u.contact}</td>
              <td>{u.date}</td>
              <td>{u.tcn}</td>
              <td>
                <span className={u.status === 'Verified' ? 'status verified' : 'status not-verified'}>
                  {u.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="top-btn">Move to top ⬆️</button>
    </div>
  );
};

export default UserTable;
