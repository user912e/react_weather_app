import style from "./style.module.scss";
const WetherCol = ({ svgComp, name, state }) => {
  return (
    <div
      className={`${style.cont} p-3 bg-dark d-flex flex-column align-items-center justify-content-center`}
    >
      <span>{svgComp}</span>
      <span>{name}</span>
      <span>{state}</span>
    </div>
  );
};

export default WetherCol;
