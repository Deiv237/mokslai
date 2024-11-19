// export default function PostContent() {
//   return (
//     <div>
//       <h2>Post title</h2>
//       <p>
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel nobis
//         perspiciatis quis reiciendis, fugit doloremque quisquam iusto ratione
//         nostrum odio aperiam repudiandae inventore asperiores ea illum! Nobis
//         cumque id optio?
//       </p>
//     </div>
//   );
// }
export default function PostContent(props) {
  return (
    <div>
      <h2 className="Post-title">{props.title}</h2>
      <p>{props.paragraph}</p>
    </div>
  );
}