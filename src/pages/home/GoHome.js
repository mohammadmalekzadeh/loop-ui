import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GoHome() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/home");
    }, [])
}