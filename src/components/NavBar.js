import React,{ useEffect } from "react"
import { Link } from "react-router-dom"
import Cookies from "js-cookie"
import Logo from "../logo.svg"
import { UserLogin } from "../Contexts/LoginContext"

export default function NavBar() {
    const url = new URL(window.location.href)
    const params = url.searchParams
    const auth_code = params.get("code")
    const { user, setUser } = UserLogin()
    function login() {
        window.location.assign(`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=repo`)
    }
    function logout() {
        setUser(undefined)
    }
    useEffect(() => {
        if(auth_code) { 
            fetch("http://localhost:4000/login?code=" + auth_code, {
                method: "GET",
                credentials: "include"
            }).then((res) => {
                console.log("response", Cookies.get("access_token"))
                res.ok && Cookies.get("access_token") && setUser(Cookies.get("access_token"))
            }).catch((err) => {
                console.log("error",err)
            })
        }
    }, [auth_code]);
    useEffect(() => {
        console.log(Cookies.get("access_token"))
    }, [user])
    return (
        <nav>
            <Link to="/">
                <img src={Logo} alt="Home" className="logo"/>
            </Link>
            { user 
                ? <button onClick={logout}>登出</button>
                : <button onClick={login}>點我登入</button>
            }
        </nav>
    )
}