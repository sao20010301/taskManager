import { useState, useEffect, useRef } from "react"
import { useOutletContext, useLocation } from "react-router-dom"
import Modal from "./Modal"
import TaskList from "./TaskList"
import { toast } from 'https://cdn.skypack.dev/wc-toast';
import fetchData from "../api/fetchData"
export default function Tasks() {
    const {user, searchInput} = useOutletContext()
    const [page, setPage] = useState(1)
    const [issues, setIssues] = useState([])
    const [label, setLabel] = useState("All")
    const [isDesc, setIsDesc] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalData, setModalData] = useState({})
    const [hasMore, setHasMore] = useState(false)
    const obRef = useRef()
    const location = useLocation()
    console.log("rendering", page, hasMore, issues)
    function handleOpenModal(event, item = {}) {
        setModalData(item)
        setModalOpen(true)
    }
    async function fetchIssues() {
        const { total_count, items } = await fetchData(user, searchInput, 1, isDesc)
        setIssues(items)
        setHasMore(!(items.length < 10))
    }
    useEffect(() => {
        setHasMore(true)
        setPage(1)
        fetchIssues()
    }, [location.pathname, isDesc])
    useEffect(() => {
        console.log("Mount")
        async function fetchMore() {
            const { total_count, items } = await fetchData(user, searchInput, page + 1, isDesc)
            setIssues([...issues, ...items])
            if (items.length < 10) {
                setHasMore(false)
            }
        }
        const observer = new IntersectionObserver(entry => {
            if(entry[0].isIntersecting) {
                console.log("In", hasMore)
                fetchMore()
                setPage(prev => prev + 1)
            }
        }, {root: null, rootMargin: '0px', threshold: 0})
        console.log("ref", obRef.current)
        obRef.current && observer.observe(obRef.current);
        return () => {
            if (observer) observer.disconnect()
        };
    }, [issues]);
    return (
        <>
            <wc-toast></wc-toast>
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
                <TaskList issues={issues} label={label} handleOpenModal={handleOpenModal} />
            </ul>
            { modalOpen && <Modal modalData={modalData} setModalOpen={setModalOpen} fetchIssues={fetchIssues}/>}
            
            { hasMore && <div ref={obRef} className="spinner"></div>}
        </> 
    )
}