import '../styles/Card.css';

// React component for each card
export default function Card({ data: { name, types, imageUrl }}) {
  return (
    <div className="card">
      <img src={imageUrl}></img>
      <div className="name">{name}</div>
    </div>
  );
}
