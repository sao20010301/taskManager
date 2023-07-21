import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import TaskForm from "./TaskForm"
import { DeleteFetch } from "../api/fetchGithub";
import { toast } from 'https://cdn.skypack.dev/wc-toast';
export default function Modal({modalData, setModalOpen, fetchIssues}) {
    const isCreate = Object.keys(modalData).length === 0
    const {user, searchInput} = useOutletContext()
    const issueTarget = searchInput.split("/")
    const [isEditing, setIsEditing] = useState(() => Object.keys(modalData).length === 0)
    function closeModal(event) {
        event.stopPropagation()
        event.target === event.currentTarget && setModalOpen(false)
    }
    async function deleteTask() {
        const res = await DeleteFetch(issueTarget, user, modalData?.number)
        if(!res.ok) { 
            throw new Error("Error when fetching data!!")
            toast('❌ Delete Fail!!')
        }
        setTimeout(() => {
            fetchIssues()
            setModalOpen(false)
        }, 1000)
        toast('✅ Delete Success!!')
    }
    return (
        <section className="modal-overlay" onClick={(event) => closeModal(event)}>
            <div className="modal">
                <header className="modal-header">
                    <div className="modal-btns">
                        { !isCreate
                            && <>
                                <button type="button" onClick={() => setIsEditing(!isEditing)}>{ !isEditing ? "EDIT" : "CANCEL"}</button>
                                <button type="button" onClick={deleteTask}>DELETE</button>
                            </>
                        }
                        <button type="button" className="modal-close-btn" onClick={() => setModalOpen(false)}>X</button>
                    </div>
                </header>
                <div className="modal-container">
                    { isEditing 
                        ? <TaskForm isCreate={isCreate} taskContent={modalData} fetchIssues={fetchIssues} setModalOpen={setModalOpen}/>
                        : <>
                            <h1>{ modalData.labels && modalData?.labels[0]?.name}</h1>
                            <h2 className="modal-title">{modalData?.title}</h2>
                            <p className="modal-content">
                                {modalData?.body}
                            </p>
                        </>
                    }
                </div>
            </div>
        </section>
    )
}