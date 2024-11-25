export default function Card({
  company,
  position,
  location,
  postedAt,
  contract,
  logo,
}) {
  return (
    <div>
      <img
        src={logo}
        alt="" />
        <div>
      <h5>{position}</h5>
      <h6>{company}</h6>
      <p>{postedAt}</p>
      <p>{contract}</p>
      <p>{location}</p>
      </div>
    </div>
  );
}
