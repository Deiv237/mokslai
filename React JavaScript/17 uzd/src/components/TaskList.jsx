export default function TaskList(props) {
  const { taskTable } = props; // Destructure props

  // Map tasks into list items
  const taskItems = taskTable.map((task, index) => (
    <li key={index}>{task}</li>
  ));

  return <ul>{taskItems}</ul>;
}
