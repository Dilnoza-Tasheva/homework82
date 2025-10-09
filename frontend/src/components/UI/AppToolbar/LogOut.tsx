import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks.ts";
import {logout} from "../../../features/users/usersThunks.ts";

const Logout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logout()).then(() => navigate("/login"));
    }, [dispatch, navigate]);

    return null;
};

export default Logout;
