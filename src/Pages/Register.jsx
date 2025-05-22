import React, { use } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const Register = () => {

    const {createUser, updateUser, setUser} = use(AuthContext)
    // console.log(createUser)

        const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form)
        const data = Object.fromEntries(formData.entries())
        const {name, email, photo, password} = data
// console.log(data)
        createUser(data)
        .then(userCredential=>{
            console.log(userCredential)
            const user = userCredential.user;
            updateUser({displayName:name, photoURL: photo})
            .then(()=>{
                setUser({...user, displayName:name, photoURL:photo})
            })
        })
        .catch(error=>{
            console.log(error)
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
                            <button className="btn btn-neutral mt-4">Login</button>
                        </fieldset>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Register;