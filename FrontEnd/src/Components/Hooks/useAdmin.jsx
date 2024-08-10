import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Authentication/AuthProvider";

const useAdmin = () => {
    const {user} = useContext(AuthContext);
    const {data : isAdmin,isLoading} = useQuery({
        queryKey : ['admin' , user?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:8000/api/v1/user?email=${user?.email}`)
            // console.log(res.data.data[0].role);
            return res.data.data[0].role
        },
        enabled:!!user?.email
        
    })
    return [isAdmin,isLoading]
}
export default useAdmin;