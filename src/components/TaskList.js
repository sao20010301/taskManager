import { memo } from "react"
function TaskList({issues, label, handleOpenModal}) {
    const labelStyle = {
        "Open": "#e5e7eb",
        "In Progress": "#f85149",
        "Done": "#3fb950"
    }
    return (
        label === "All" 
        ?
        issues?.map(issue => 
            <div className="task" key={issue.id}>
                <article onClick={(event) => handleOpenModal(event, issue)} className="task-article">
                    <div className="task-header">
                        <p 
                        className="task-label"
                        style={{backgroundColor:labelStyle[`${issue.labels[0]?.name}`]}}>
                            {issue.labels[0]?.name}
                        </p>
                        <span className="task-created-time"><p>created at: {issue.created_at}</p></span>
                    </div>
                    <h3 className="task-title">{issue.title}</h3>
                </article>
            </div>
        )
        :
        issues.filter(issue => { return issue.labels[0].name === label })
        .map(issue => 
            <div className="task" key={issue.id}>
                <article onClick={(event) => handleOpenModal(event, issue)} className="task-article">
                    <div className="task-header">
                    <p 
                    className="task-label"
                    style={{backgroundColor:labelStyle[`${issue.labels[0]?.name}`]}}>
                        {issue.labels[0]?.name}
                    </p>
                        <span className="task-created-time"><p>created at: {issue.created_at}</p></span>
                    </div>
                    <h3 className="task-title">{issue.title}</h3>
                </article>
            </div>
        )
    )
}

export default TaskList