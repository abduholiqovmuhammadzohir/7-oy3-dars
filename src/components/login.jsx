import {useRef} from "react"
import { useNavigate } from "react-router-dom"

function register() {

    const usernameRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()
 
    function handleSubmit(e) {
        e.preventDefault()
         
        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }

        if (username.trim() === "") {
            alert("username bo'sh")
            usernameRef.current.focus()
            return false
        }
        if (password.trim().length < 3) {
            alert("username bo'sh")
            passwordRef.current.focus()
            return false
        }
        if (username.trim().length < 3) {
            alert("email bo'sh")
            usernameRef.current.focus()
            return false
        }
        if (password.trim() === "") {
            alert("password bo'sh")
            passwordRef.current.focus()
            return false
        } 

        fetch("https://auth-rg69.onrender.com/api/auth/signin", {
            method:"POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if (data.id) {
                navigate("/")
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("user", JSON.stringify(data));
            }else{
                navigate('/register')
            }
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className='container w-50 mt-2'>
            <h2 className='text-center mb-4'>Login page</h2>
            <form className='w-50 mx-auto' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor='username' className="form-label">Username</label>
                    <input ref={usernameRef} type="text" className="form-control" id="username" placeholder='Enter Username...' />
                </div>

                <div className="mb-3">
                    <label htmlFor='password' className="form-label">Password</label>
                    <input ref={passwordRef} type="password" className="form-control" id="password" placeholder='Enter Password...' />
                </div>
                
                <button type="submit" className="btn btn-primary w-100">Login</button>
                <button type="submit" className="btn btn-primary w-30 mt-3" onClick={() => {
                    navigate("/register")
                }}>Register</button>
            </form>
        </div>
    )
}

export default register