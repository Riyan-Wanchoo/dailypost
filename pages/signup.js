import React, { useState, useEffect } from 'react'
import styles from "../styles/Login.module.css"
import Script from 'next/script'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

const Signup = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [response, setResponse] = useState()
    const router = useRouter()

    const handleChange = (e) => {
        if (e.target.name == "email") {
            setEmail(e.target.value)
        }
        else if (e.target.name == "username") {
            setUsername(e.target.value)
        }
        else {
            setPassword(e.target.value)
        }
    }
    useEffect(() => {
        if (Cookies.get("jwt")) {
            router.push("/")
        }
    }, [])


    const handleSubmit = async (e) => {
        // console.log(email)
        // console.log(password)
        e.preventDefault()

        //Basic Check
        if (email == '' || password == '') {
            props.notify("Field cannot be blank", "error")
        }
        else if (username.length > 20) {
            props.notify("Length of username cannot be more than 20", "error")
        }
        else {
            const signupData = {
                username: username,
                email: email,
                password: password,
            };
            const signup = await fetch(`${process.env.apiHost}/api/auth/local/register`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupData),
            });
            const signupResponseData = await signup.json();
            if (signupResponseData.error) {
                if (signupResponseData.error.message == "Email or Username are already taken") {
                    props.notify("Email or Username is already taken", "error")
                }
            }
            else if (signupResponseData.jwt) {
                setResponse(signupResponseData)
                props.notify("Signed Up successfully", "success")
                console.log(signupResponseData)
            }
            else {
                props.notify("Some error occurred", "error")
            }




            const loginData = {
                identifier: email,
                password: password,
            };

            const login = await fetch(`${process.env.apiHost}/api/auth/local`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const loginResponseData = await login.json();
            if (loginResponseData.jwt) {
                setResponse(loginResponseData)
                Cookies.set('jwt', loginResponseData.jwt)
                Cookies.set('username', loginResponseData.user.username)
                router.push("/")
            }
        }
    }

    return (
        <div className={styles.outerCont}>
            <div className={styles.container}>
                <img className={styles.displayimg} src="/login.jpg" alt="" />
                <form className={`${styles.form}`}>
                    <Head>
                        <title>Sign Up | Dailypost</title>
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"></link>
                    </Head>
                    <div className="text-center d-flex justify-content-center align-items-center mb-4">
                        <img className={styles.logo} src="/dailypost-logo.png" alt="" />
                        <h4 className='mx-2'>Dailypost</h4>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input name='username' type="text" onChange={handleChange} value={username} className="form-control" id="username" aria-describedby="username" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input name='email' type="email" onChange={handleChange} value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input name='password' type="password" onChange={handleChange} value={password} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button onClick={handleSubmit} className={`${styles.button} btn btn-primary`} type="submit">Sign Up</button>
                    <div className={`${styles.or} mt-2`}>
                        <span className={styles.dash}></span>
                        <Link href="/login" legacyBehavior><a><span className={styles.orTxt}>OR LOGIN</span></a></Link>
                        <span className={styles.dash}></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup