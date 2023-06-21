import { useState } from "react"
export default function TaskForm({isCreate, taskContent, setTaskContent}) {
    console.log("form",isCreate, taskContent?.labels)
    const mode = isCreate ? "create" : "edit"
    const [label, setLabel] = useState()
    const [formData, setFormData] = useState({
        label: Object.keys(taskContent).length !== 0 ? taskContent.labels[0].name : "Open",
        formTitle: taskContent?.title,
        formBody: taskContent?.body
    })
    console.log("isCreate", mode, taskContent)
    function handleSubmit(event) {
        event.preventDefault()
        console.log(event.target.id === "create")
    }
    return (
        <form id={mode} className="task-form" onSubmit={(event) => handleSubmit(event)}>
            <select value={label} onChange={(event) => setFormData(formData => ({
                ...formData,
                ["label"]: event.target.value
            }))} className="task-form-select">
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>
            <input type="text" className="task-form-title" value={formData?.formTitle} onChange={(event) => setFormData(formData => ({
                ...formData,
                ["formTitle"]: event.target.value
            }))} required/>
            <textarea className="task-form-body" value={formData?.formBody} onChange={(event) => setFormData(formData => ({
                ...formData,
                ["formBody"]: event.target.value
            }))} minLength="30"/>
            <button className="submit-btn" type="submit">確定</button>
        </form>
    )
}