// export default function PostImage() {
//   return (
//     <div>
//       <img
//         src="src/components/images/cat.jpg"
//         alt="Domestic cat"
//         className="header-img w-100 object-fit-cover rounded-circle"
//       />
//     </div>
//   );
// }
export default function PostImage(props) {
  return (
    <div>
      <img
        src={props.link}
        alt="Domestic cat"
        className="header-img w-100 object-fit-cover rounded-circle"
      />
    </div>
  );
}