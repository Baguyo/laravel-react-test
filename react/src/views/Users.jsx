import { useEffect, useState } from 'react'
import axiosClient from '../axios-client'
import { Link } from 'react-router-dom'

const Users = () => {

  const [users, _setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // _setUsers({pota:'weak'});
  // console.log(users);

  const getUsers = () => {
    setLoading(true);
    axiosClient.get('/users')
      .then(({ data }) => {
        setLoading(false);
        // console.log(data);
        _setUsers(data.data);
      })
      .catch(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    getUsers();
  }, []);

  const onDelete = (u) => {
    if(!window.confirm('Are you sure to delete this users')){
      return
    }

    axiosClient.delete(`/users/${u.id}`)
    .then(
      getUsers()
    )
  }



  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Users</h1>
        <Link to='/users/new' className='btn-add'>Add new</Link>
      </div>
      <div className='card animated fadeInDown'>
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Email</td>
              <td>Create Date</td>
              <td>Actions</td>
            </tr>
          </thead>
          {loading && <tbody>
            <tr>
              <td colSpan="5" className='text-center'>
                Loading...
              </td>
            </tr>
          </tbody> }
          {!loading && <tbody>
            {
              users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.created_at}</td>
                  <td>
                    <Link to={'/users/' + u.id} className='btn-edit'>Edit</Link>
                    &nbsp;
                    <Link onClick={() => onDelete(u)} className='btn-delete'>Delete</Link>
                  </td>
                </tr>)

              )
            }
          </tbody>}
        </table>
      </div>
    </div>
  )
}

export default Users