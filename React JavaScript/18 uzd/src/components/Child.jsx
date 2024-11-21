export default function Child({props}) {
    return ( <ul>
        {props.map((item, index) => (
            <li key={index}>{item}</li>
        ))}
    </ul>
    )
}