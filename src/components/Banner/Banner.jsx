import "./Banner.css";

const Banner = (props) => {
  const imageUrl = props.image;

  return (
    <div
      className="banner"
      style={{ backgroundImage: `url(${imageUrl})` }}
    ></div>
  );
};

export default Banner;
