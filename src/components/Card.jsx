import '../styles/Card.css';

// React component for each card
export default function Card({
  data: { name, types, imageUrl },
  handleSelection,
}) {
  const onClick = () => handleSelection(name);

  return (
    <div
      className="card"
      style={{ backgroundColor: `var(--${types[0]})` }}
      onClick={onClick}
    >
      <img src={imageUrl}></img>
      <h3 className="name">{name}</h3>
    </div>
  );
}
