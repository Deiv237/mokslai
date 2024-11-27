import { useEffect, useState } from "react";
import Card from "./components/Card";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.github.com/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching GitHub users", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          {users.map((user) => (
            <div
              key={user.id}
              className="col-md-4 col-sm-4 d-flex justify-content-center mb-4"
            >
              <Card user={user} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
