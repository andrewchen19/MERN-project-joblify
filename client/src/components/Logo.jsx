import logo from "../assets/images/logo.png";

const Logo = ({ imgSize, textSize, additionalClass }) => {
  return (
    <div className={`flex gap-x-4 items-center ${additionalClass}`}>
      <img src={logo} alt="joblify logo" className={imgSize || "h-6 w-6"} />
      <h3
        className={`font-palanquin font-bold tracking-wide text-primary ${
          textSize || "text-3xl"
        }`}
      >
        Joblify
      </h3>
    </div>
  );
};

export default Logo;
