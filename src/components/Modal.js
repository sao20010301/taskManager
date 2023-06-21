import { useState,useEffect } from "react"
import TaskForm from "./TaskForm"
export default function Modal({modalData, setModalOpen}) {
    const isCreate = Object.keys(modalData).length === 0
    console.log("modal",isCreate)
    const [isEditing, setIsEditing] = useState(() => Object.keys(modalData).length === 0)
    const [taskContent, setTaskContent] = useState(modalData)
    function closeModal(event) {
        event.stopPropagation()
        event.target === event.currentTarget && setModalOpen(false)
    }

    return (
        <section className="modal-overlay" onClick={(event) => closeModal(event)}>
            <div className="modal">
                <header className="modal-header">
                    <div className="modal-btns">
                        { !isCreate
                            && <>
                                <button type="button" onClick={() => setIsEditing(!isEditing)}>{ !isEditing ? "EDIT" : "CANCEL"}</button>
                                <button type="button">DELETE</button>
                            </>
                        }
                        <button type="button" className="modal-close-btn" onClick={() => setModalOpen(false)}>X</button>
                    </div>
                </header>
                <div className="modal-container">
                    { isEditing 
                        ? <TaskForm isCreate={isCreate} taskContent={taskContent} setTaskContent={setTaskContent}/>
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