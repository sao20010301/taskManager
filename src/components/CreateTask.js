import EditTask from "./TaskForm";

export default function CreateTask({editContent ,setEditContent}) {
    return (
        <EditTask editContent={editContent} setEditContent={setEditContent}/>
    )
}