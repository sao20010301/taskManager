import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { CreateFetch, UpdateFetch } from "../api/fetchGithub"
import { toast } from 'https://cdn.skypack.dev/wc-toast'
import ReactLoading from 'react-loading';
export default function TaskForm({isCreate, taskContent, fetchIssues, setModalOpen}) {
    const {user, searchInput} = useOutletContext()
    const issueTarget = searchInput.split("/")
    const [isFetching , setIsFetching] = useState(false)
    const mode = isCreate ? "create" : "edit"
    const [formData, setFormData] = useState({
        label: Object.keys(taskContent).length !== 0 ? taskContent.labels[0].name : "Open",
        title: taskContent?.title || "",
        body: taskContent?.body || ""
    })
    async function createTask() {
        const res = await CreateFetch(issueTarget, formData, user)
        if(!res.ok) { 
            throw new Error("Error when fetching data!!")
            toast('❌ Create Fail!!')
        }
        toast('✅ Create Success!!')
    }
    async function updateTask() {
        const res = await UpdateFetch(issueTarget, formData, user, taskContent?.number)
        if(!res.ok) { 
            throw new Error("Error when fetching data!!")
            toast('❌ Update Fail!!')
        }
        toast('✅ Update Success!!')
    }
    function handleSubmit(event) {
        event.preventDefault()
        setIsFetching(true)
        isCreate ? createTask() : updateTask()
        setTimeout(() => {
            fetchIssues()
            setIsFetching(false)
            setModalOpen(false)
        }, 2000)
    }
    return (
        <>
            <form id={mode} className="task-form" onSubmit={(event) => handleSubmit(event)}>
                <select value={formData?.label} onChange={(event) => setFormData(formData => ({
                    ...formData,
                    ["label"]: event.target.value
                }))} className="task-form-select">
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
                <input type="text" className="task-form-title" value={formData?.title} onChange={(event) => setFormData(formData => ({
                    ...formData,
                    ["title"]: event.target.value
                }))} required/>
                <textarea className="task-form-body" value={formData?.body} onChange={(event) => setFormData(formData => ({
                    ...formData,
                    ["body"]: event.target.value
                }))} minLength="30" required/>
                <button className="task-form-submit" type="submit">
                    { isFetching 
                        ? <ReactLoading type={"bars"} className={"loadingBar"} color={"white"} height={'15px'} width={'10%'}></ReactLoading> 
                        : <b>Confirm</b>
                    }
                </button>
            </form>
        </>
    )
}