import { Link, useParams } from "react-router";

const products = [
    { id: 1, name: "Product A" },
    { id: 2, name: "Product B" },
    { id: 3, name: "Product C" },
  ];

export default function ProductDetails() {

    const { id } = useParams();
    const found = products.find((prod) => prod.id == id);

    return (
        <div>
            <h2>{found.name}</h2>
            <Link to="/">
            <p>Back to Product List</p>
            </Link>
        </div>
    )
}