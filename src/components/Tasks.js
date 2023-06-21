import { useState, useEffect, useRef } from "react"
import { useOutletContext, useLocation } from "react-router-dom"
import Modal from "./Modal"
export default function Repos() {
    const {user, searchInput} = useOutletContext()
    const [page, setPage] = useState(1)
    const [issues, setIssues] = useState([])
    const [label, setLabel] = useState("All")
    const [isDesc, setIsDesc] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalData, setModalData] = useState({})
    const obRef = useRef()
    const location = useLocation()
    function handleOpenModal(event, item = {}) {
        console.log(event, item)
        setModalData(item)
        setModalOpen(true)
    }
    async function fetchData(repo, pageCount) {
        console.log("page:", repo, pageCount, isDesc)
        const res = await fetch("https://api.github.com/search/issues?q=" + repo + `&page=${pageCount}&per_page=10&order=${isDesc ? "desc" : "asc"}`, {
            headers: {
                Authorization: `Bearer ${user}`
            }
        })
        if(!res.ok) { 
            throw new Error("Error when fetching data!!")
        }    
        const res_json = await res.json()
        console.log("data:", res_json)
        const { total_count, items } = res_json
        return { total_count, items }
    }
    async function fetchIssues() {
        const { total_count, items } = await fetchData(searchInput, 1)
        setIssues(items)
    }
    async function fetchMore() {
        console.log("More", issues, page)
        const { total_count, items } = await fetchData(searchInput, page)
        setIssues([...issues, ...items])
    }
    useEffect(() => {
        setPage(1)
        console.log("Load", page)
        fetchIssues()
    }, [location.pathname, isDesc])
    useEffect(() => {
        page> 1 && fetchMore()
    }, [page])
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
            if(entry.isIntersecting) {
                setPage(prev => prev + 1)
            }
            }, {root: null, rootMargin: '0px', threshold: 0})
        })
        observer.observe(obRef.current);
        return () => {
            observer.disconnect()
        };
    }, []);
    return (
        <>
            <div className="task-filter">
                <div className="task-filter-block">
                    <select value={label} onChange={(event) => setLabel(event.target.value)}>
                        <option value="All" default>All</option>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <div className="task-filter-block">
                    { isDesc ? <button className="task-filter-btn" onClick={() => setIsDesc(!isDesc)}>DESC</button> : <button className="task-filter-btn" onClick={() => setIsDesc(!isDesc)}>ASC</button>}
                </div>
                <div className="task-filter-block">
                    <button onClick={(event) => handleOpenModal(event)} className="task-add-btn">NEW TASK +</button>
                </div>
            </div>
            <ul>
                {
                    issues?.map(issue => 
                        <div className="task" key={issue.id}>
                            <article onClick={(event) => handleOpenModal(event, issue)} className="task-article">
                                <div className="task-header">
                                    <p className="task-label">{issue.labels[0]?.name}</p>
                                    <span className="task-created-time"><p>created at: {issue.created_at}</p></span>
                                </div>
                                <h3 className="task-title">{issue.title}</h3>
                            </article>
                        </div>
                    )
                }
            </ul>
            { modalOpen && <Modal modalData={modalData} setModalOpen={setModalOpen}/>}
            { <div ref={obRef} className="spinner"></div> } 
        </> 
    )
}