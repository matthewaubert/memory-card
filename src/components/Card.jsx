import '../styles/Card.css';

// const colors = {
//   bug: '#d9f99d', // lime 200
//   dragon: '#a7f3d0', // emerald 200
//   electric: '#fef08a', // yellow 200
//   fighting: '#fed7aa', // orange 200
//   fire: '#fecaca', // red 200
//   flying: '#bfdbfe', // blue 200
//   ghost: '#e9d5ff', // purple 200
//   grass: '#bbf7d0', // green 200
//   ground: '#e7e5e4', // stone 200
//   ice: '#99f6e4', // teal 200
//   normal: '#e5e7eb', // gray 200
//   poison: '#ddd6fe', // violet 200
//   psychic: '#fbcfe8', // pink 200
//   rock: '#e2e8f0', // slate 200
//   water: '#bae6fd', // sky 200
// };

// React component for each card
export default function Card({ data: { name, types, imageUrl }}) {
  return (
    <div className="card" style={{backgroundColor: `var(--${types[0]})`}}>
      <img src={imageUrl}></img>
      <h3 className="name">{name}</h3>
    </div>
  );
}
