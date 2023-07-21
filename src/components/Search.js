import { useRef } from "react"
import { useNavigate } from "react-router-dom"
export default function Search({setSearchInput}) {
    const navigate = useNavigate()
    async function handleEnter(event) {
        if(event.key === "Enter" && event.target.value !== "") {
            setSearchInput(event.target.value)
            navigate(`/search/${event.target.value}`) 
        }
    }
    return (
        <input type="search" className="search" defaultValue="" onKeyDown={handleEnter} placeholder="repo:USER/REPO_NAME"></input>
    )
}