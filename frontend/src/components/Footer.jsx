import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faMailBulk } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <>
      <footer className="container-fluid container--footer">
        <small>
          © 2023 ImageEmpress | v0.9.1 (BETA) |{" "}
          <a
            href="#"
            data-target="modal-example"
            onClick={(e) => toggleModal(e)}
          >
            <FontAwesomeIcon icon={faCircleInfo} /> Terms & Privacy
          </a>{" "}
          |{" "}
          <a href="mailto:mahdigh@live.com">
            {" "}
            <FontAwesomeIcon icon={faMailBulk} /> Contact
          </a>
        </small>
      </footer>
    </>
  );
};

export default Footer;
