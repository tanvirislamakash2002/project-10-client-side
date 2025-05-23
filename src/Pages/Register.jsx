import React, { use } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Register = () => {

    const { createUser, updateUser, loginWithGoogle, setUser } = use(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    // console.log(createUser)

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form)
        const data = Object.fromEntries(formData.entries())
        const { name, email, photo, password } = data
        // console.log(data)
        createUser(data)
            .then(userCredential => {
                console.log(userCredential)
                const user = userCredential.user;
                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        toast.success('Successfully login')
                        setUser({ ...user, displayName: name, photoURL: photo })
                        navigate(`${location.state ? location.state : '/'}`)
                    })
            })
            .catch(error => {
                toast.error(`failed to login ${error.message}`)
            })
    }

    const handleLoginWithGmail = () => {
        loginWithGoogle()
            .then(res => {
                toast.success('Successfully login with google')
                navigate(`${location.state ? location.state : '/'}`)
            })
            .catch(error => {
                toast.error('failed to login with google',error.message)
            })
    }
    return (
        <form onSubmit={handleRegister} className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <fieldset className="fieldset">
                            <label className="label">Name</label>
                            <input name='name' type="text" className="input" placeholder="Email" />
                            <label className="label">Email</label>
                            <input name='email' type="email" className="input" placeholder="Email" />
                            <label className="label">PhotoURL</label>
                            <input name='photo' type="text" className="input" placeholder="Email" />
                            <label className="label">Password</label>
                            <input name='password' type="password" className="input" placeholder="Password" />
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button onClick={handleLoginWithGmail} className="btn bg-white text-black border-[#e5e5e5]">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Login with Google
                            </button>
                            <p>Already have an account <Link to='/login' className='text-red-500'>Login</Link></p>
                            <button className="btn btn-neutral mt-4">Login</button>
                        </fieldset>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Register;