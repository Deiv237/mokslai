import PostContent from "./PostContent";
import { v4 as uuidv4 } from "uuid";

export default function PostList() {
    const posts = [
        {
            title: "HTML",
            content: "Lorem ipsum HTML",
            img: "https://picsum.photos/id/123/200/200",
        },
        {
            title: "CSS",
            content: "Lorem ipsum CSS",
            img: "https://picsum.photos/id/237/200/200",
        },
        {
            title: "JavaSript",
            content: "Lorem ipsum JavaSript",
            img: "https://picsum.photos/id/222/200/200",
        },
    ];

    const list = posts.map((post) => {
        return (
            <PostContent
            key={uuidv4()}
            title={post.title}
            content={post.content}
            img={post.img}
            />
        );
    });

    return <div>{list}</div>;
}