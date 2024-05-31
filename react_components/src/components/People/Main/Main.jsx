import "./Main.css";
import Content from "./Content";

const Main = ({ person }) => {
  return (
    <>
      <Content selectedPerson={person} />
    </>
  );
};

export default Main;
