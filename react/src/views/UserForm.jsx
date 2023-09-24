import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axiosClient from "../axios-client"

const UserForm = () => {


    const { id } = useParams()
    const [loading, setLoading] = useState(false)

    const [errors, setErrors] = useState(null);

    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    // console.log(data.data);
                    setLoading(false)
                    setUser(data)
                }).catch(() => {
                    setLoading(false);
                })
        }, [])
    }

    const onSubmit = (e) => {
        e.preventDefault();

    }

    return (
        <div>
            {user.id && <h1>Update User : {user.name} </h1>}
            {!user.id && <h1>New User</h1>}

            {
                loading && <div className="card animated fadeInDown">
                    <div className="text-center">Loading...</div>
                </div>
            }

            {
                errors && <div className='alert'>
                    {Object.keys(errors).map(key => (
                        <p key={key}> {errors[key][0]} </p>
                    ))}
                </div>
            }

            {!loading &&
                <form onSubmit={onSubmit}>
                    <input onChange={ev => setUser({ ...user, name: ev.target.value })} value={user.name} type="text" placeholder="Name" />
                    <input onChange={ev => setUser({ ...user, email: ev.target.value })} value={user.email} type="text" placeholder="Email" />
                    <input onChange={ev => setUser({ ...user, password: ev.target.value })} type="text" placeholder="Password" />
                    <input onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })} type="text" placeholder="Retype Password" />
                    <button className="btn">
                        Save
                    </button>
                </form>
            }

        </div>
    )
}

export default UserForm