const fetchUserData = async (userid) => {
    try {
        const response = await fetch (`https://jsonplaceholder.typicode.com/users/${userid}`);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error ("User not found");
            }   else {
                throw new Error ("error")
            }
        }
        const data = await response.json();
        console.log(`User Name: ${data.name}`);
    }   catch (error) {
        // console.error(error);
        if (error.message === "User not found") {
            console.error(error.message);
        }
        else {
            console.error("Network error occurred");
        }
    }
}
fetchUserData(1); // Should fetch and log the name of the user with ID 1
fetchUserData(999); // Should log "User not found" error in the console
