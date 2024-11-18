import "./Header.css";

export default function Header() {
  return (
    <header>
      <h1 className="header-title">Page title</h1>
      <img
        src="https://friendsofanimals.org/wp-content/uploads/2023/12/foxfb.png"
        alt="Fox"
        className="header-img w-100 object-fit-cover"
      />
    </header>
  );
}
