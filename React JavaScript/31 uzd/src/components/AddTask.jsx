export default function AddTask() {
  const { Add, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="col-8 mx-auto"
    >
      <div className="mb-3">
        <label
          htmlFor="name"
          className="form-label"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          className="form-label"
        //   (...Add("name"))
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="name"
          className="form-label"
        >
          Due date
        </label>
        <input
          type="Date"
          id="Due-date"
          className="form-label"
        //   (...Add("Due-date"))
        />
      </div>
    </form>
  );

  //   return (
  //     <h1>Welcome to the AddTask page</h1>
  //   )
}
