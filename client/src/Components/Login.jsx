import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useData } from '../context/Appcontext'
import { motion } from 'motion/react'
import axios from "axios"
import { toast } from 'react-toastify'
import { data, Navigate, useNavigate } from 'react-router-dom'

const Login = () => {
    const { setshowLogin, backendUrl, setuser, storeToken } = useData()
    const [state, setstate] = useState('login');
const navigate= useNavigate()
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submit clicked");

        console.log("Form state is:", state);
        console.log("Email:", email);
        console.log("Password:", password);

        try {
            if (state === 'login') {
                console.log("Sending login request...");

                const response = await axios.post('http://localhost:3001/api/auth/login', {
                    email,
                    password,
                });

                console.log("Login success:", response.data);
                storeToken(response.data.token);
                setuser({
                    id: response.data.userId,
                    name: response.data.username,
                    credit: response.data.credit
                });
                setshowLogin(false);

            } else {
               
                const response = await axios.post('http://localhost:3001/api/auth/register', {
                    name,
                    email,
                    password,
                });

                console.log("register success:", response.data);
                if (response.data) {
                    storeToken(response.data.token);
                setuser({
                    id: response.data.userId,
                    name: response.data.username,
                    credit: response.data.credit
                });
                setshowLogin(false);
                }else{
                      const errorMessage = error.response?.data?.message || "registeration failed.";
            
            toast.error(errorMessage);
                }
                
                
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Login failed.";
            
            toast.error(errorMessage);
        }
    };

    return (
        <div className='fixed text-white h-screen top-0 left-0 right-0 bottom-0 backdrop-blur-md z-10 bg-black/40 flex items-center justify-center'>
            <motion.form onSubmit={handleSubmit}
                initial={{ opacity: 0.2, y: 50 }}
                transition={{ duration: 0.5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                action="" className='relative p-10  bg-slate-800/40 rounded-xl'>
                <h1 className='text-center font-semibold text-2xl'>{state}</h1>
                <p className='text-sm'>Welcome back! please sign in to continue</p>
                {state != 'login' && <div className='mt-4 border px-6 flex items-center gap-2 py-2 rounded-full'>
                    <img src={assets.profile_icon} width={20} alt="" />
                    <input onChange={e => setname(e.target.value)} value={name} className='outline-none text-sm' type="text" required placeholder='username' />
                </div>}


                <div className='mt-4 border px-6 flex items-center gap-2 py-2 rounded-full'>
                    <img src={assets.email_icon} alt="" />
                    <input onChange={e => setemail(e.target.value)} value={email}
                        className='outline-none text-sm' type="email" required placeholder='email' />
                </div>
                <div className='mt-4 border px-6 flex items-center gap-2 py-2 rounded-full'>
                    <img src={assets.lock_icon} alt="" />
                    <input onChange={e => setpassword(e.target.value)} value={password}
                        className='outline-none text-sm' type="password" required placeholder='password' />
                </div>

                <p className='text-sm  mt-4 text-blue-400'>Forget Password?</p>
                <button className='w-full text-sm mt-3 py-2 bg-blue-600 cursor-pointer rounded-full text-center'>
                    {state === 'login' ? 'Login' : "Create account"}
                </button>
                {state === 'login' ? <p className='mt-4 text-center text-sm'>Dont have an account? {" "}
                    <span className='text-blue-500 cursor-pointer' onClick={() => setstate('Signup')}>Signup</span>
                </p>
                    :
                    <p className='mt-4 text-center text-sm'>Alredy have an account? {" "}
                        <span className='text-blue-500 cursor-pointer' onClick={() => setstate('login')}>Login</span>
                    </p>
                }

                <img onClick={() => setshowLogin(false)} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer' />
            </motion.form>
        </div>
    )
}

export default Login
