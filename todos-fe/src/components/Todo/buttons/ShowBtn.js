import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ShowBtn = ({itemId}) => {
  
  return (
    <>
      <Link to={`/todo/${itemId}`} className="card-footer-item">
        <FontAwesomeIcon icon={faEye} className="mr-2" />
        Show
      </Link>
    </>
  );
};

export default ShowBtn;
