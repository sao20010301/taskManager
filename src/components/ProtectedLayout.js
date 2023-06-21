import Main from "./Main"
import { UserLogin } from "../Contexts/LoginContext"

export default function ProtectedLayout() {
    const { user } = UserLogin()
    return (
        <>
            {user && <Main />}
        </>
    )
}