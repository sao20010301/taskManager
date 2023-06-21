import { useNavigate } from "react-router-dom"
export default function Search({searchInput, setSearchInput, FirstLoad, setIssues, issues}) {
    const navigate = useNavigate()
    async function handleEnter(event) {
        if(event.key === "Enter") {
            const subSearchInput = searchInput.substring(searchInput.indexOf(":")+1)
            navigate(`/search/${subSearchInput}`)
            // const items = await fetchData(searchInput, page)
            // console.log("Fetch search result:", items)
            // setPage(prev => prev+1)
            // console.log("page:", page)
            
        }
    }
    return (
        <input type="search" className="search" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} onKeyDown={handleEnter} placeholder="repo:USER/REPO_NAME"></input>
    )
}