// export default function Box() {
//   return (
//     <div>
//       <img
//         src="src/components/images/cat.jpg"
//         alt="Domestic cat"
//         className="header-img w-100 object-fit-cover"
//       />
//     </div>
//   );
// }
import "./Box.css";
export default function Box(props) {
  return (
    <div className={props.class}>
    </div>
  );
}