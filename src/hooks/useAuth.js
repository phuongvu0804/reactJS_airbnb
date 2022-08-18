import { useState } from "react";

const useAuth = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const login = (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return { user, login, logout };
};

export default useAuth;
