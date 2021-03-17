import PropTypes from "prop-types";
import "./Hero.css";

function Hero({ cover, title, description }) {
  return (
    <section className="Hero">
      <div className="content">
        <h1>{title}</h1>
        <h2>{description}</h2>
      </div>
      <img src={cover} alt={title} />
    </section>
  );
}

Hero.propTypes = {
  cover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Hero;
