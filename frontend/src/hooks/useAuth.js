export const useAuth = () => {
    const isLogged = localStorage.getItem("isLogged");
    return { isLogged };
};