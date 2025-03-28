// Save user details in local storage
export const saveUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
};

// Get user from local storage
export const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

// Remove user from local storage (Logout)
export const removeUser = () => {
    localStorage.removeItem("user");
};
