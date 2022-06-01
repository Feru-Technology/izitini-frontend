import { Outlet, useNavigate } from "react-router-dom"

const Authenticate = ({ isLoggedIn, ...props }: any) => {
    const navigate = useNavigate()
    return <>isLoggedIn ? <Outlet /> : {navigate('/signin')}</>
}

export default Authenticate
