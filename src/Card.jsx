import "./Card.css";

const Card = ({ img, type }) => {
  return (
    <div className="card" id={type}>
      <img src={img} />
    </div>
  );
};

export default Card;
