import { useState } from "react"
import { UserLogin } from "../Contexts/LoginContext"
import { Outlet } from "react-router-dom"
import Search from "./Search"



export default function Main() {
    const { user } = UserLogin()
    const [searchInput, setSearchInput] = useState("")
    return (
        <section className="main">
            <section className="header">
                <Search setSearchInput={setSearchInput}/>
            </section>
            <Outlet context={{searchInput, user}} />
        </section>
    )
}