import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({children}) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        const isTokenAvailable = localStorage.getItem("token");
        
        setUser({name: "Somen"})
        if(!isTokenAvailable) {
            navigate("/login")   
        } 
    }, [])

    if(user) {
        return (<div>
            {children}
        </div>)
    }
}

export default ProtectedRoute