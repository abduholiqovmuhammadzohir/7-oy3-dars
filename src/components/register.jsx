import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [isRegistered, setIsRegistered] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (username.trim() === "") {
            alert("username bo'sh")
            usernameRef.current.focus()
            return false
        }
        if (email.trim() === "") {
            alert("email bo'sh")
            emailRef.current.focus()
            return false

        }
        if (password.trim() === "") {
            alert("password bo'sh")
            passwordRef.current.focus()
            return false

        }
        else if (!/\S+@\S+\.\S+/.test(email)) {
            alert("emailhato bo'sh")
            emailRef.current.focus()
            return false

        }
        if (password.trim().length < 3) {
            alert("username bo'sh")
            passwordRef.current.focus()
            return false
        }
        if (email.trim().length < 3) {
            alert("email bo'sh")
            emailRef.current.focus()
            return false
        }
        if (username.trim().length < 3) {
            alert("email bo'sh")
            usernameRef.current.focus()
            return false
        }


        const user = {
            username,
            email,
            password
        };

        fetch("https://auth-rg69.onrender.com/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === "User registered successfully!") {
                    setIsRegistered(true);
                    navigate("/");
                }
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
    }


    return (
        <div className='container w-50 mt-2'>
            <h2 className='text-center mb-4'>Register page</h2>
            {!isRegistered && (
                <form className='w-50 mx-auto' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor='username' className="form-label">Username</label>
                        <input ref={usernameRef} type="text" className="form-control" id="username" placeholder='Enter Username...' />
                    </div>

                    <div className="mb-3">
                        <label htmlFor='email' className="form-label">Email</label>
                        <input ref={emailRef} type="email" className="form-control" id="email" placeholder='Enter Email...' />
                    </div>

                    <div className="mb-3">
                        <label htmlFor='password' className="form-label">Password</label>
                        <input ref={passwordRef} type="password" className="form-control" id="password" placeholder='Enter Password...' />
                    </div>


                    <button type="submit" className="btn btn-primary w-100">
                        Register
                    </button>
                    <button type="submit" className="btn btn-primary w-30 mt-3" onClick={() => {
                        navigate("/")
                    }}>Login</button>
                </form>
            )}
            {isRegistered && (
                <div className="alert alert-success w-50 mx-auto" role="alert">
                    Registered successfully!
                </div>

            )}
        </div>
    );
}

export default Register;
