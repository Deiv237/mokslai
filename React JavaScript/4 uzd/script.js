const displayUserName = async (userid) => {
    const userinfo = document.getElementById("user-info")
    try {
        const response = await fetch (`https://jsonplaceholder.typicode.com/users/${userid}`);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error ("User not found");
            }   else {
                throw new Error ("error");
            }
        }
        const data = await response.json();
        userinfo.textContent = `User Name: ${data.name}`;
    }   catch (error) {
        userinfo.textContent = `Error ${error.message}`;
    }
}
displayUserName(1);