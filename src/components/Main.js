import { useState } from "react"
import { UserLogin } from "../Contexts/LoginContext"
import { Outlet } from "react-router-dom"
import Search from "./Search"



export default function Main() {
    console.log("main load")
    const { user } = UserLogin()
    const [searchInput, setSearchInput] = useState("")


    // let total_amount = 0
    // async function FirstLoad() { 
    //     const { total_count ,items } = await fetchData(user, searchInput, page)
    //     total_amount = total_count
    //     console.log(total_count, items)
    //     page > 1 ? setIssues([...issues, ...items]) : setIssues(items)
    //     console.log(page)
    //     setPage(prev => prev + 1)
    // }
    
    return (
        <section className="main">
            <section className="header">
                <Search searchInput={searchInput} setSearchInput={setSearchInput}/>
            </section>
            <Outlet context={{searchInput, user}} />
            
        </section>
    )
}