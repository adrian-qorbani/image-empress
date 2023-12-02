import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <footer className="container-fluid container--footer">
        <small>
          © 2023 ImageEmpress | v0.9.1 (BETA) |{" "}
          <a href="#" data-target="modal-example" onClick={openModal}>
            <FontAwesomeIcon icon={faCircleInfo} /> Terms & Privacy
          </a>{" "}
          |{" "}
          <a href="mailto:mahdigh@live.com">
            {" "}
            <FontAwesomeIcon icon={faMailBulk} /> Contact
          </a>
        </small>
      </footer>
      {isModalOpen && (
        <Modal onClose={closeModal} title={"Terms & Privacy"}>
          <div className="policies">
            <h3>Introduction</h3>
            <p>
              At our website, we are committed to protecting your privacy and
              providing a secure user experience. This Privacy Policy applies to
              the services offered through our website and outlines the
              procedures for data collection, storage, and protection.
            </p>
            <h4>Information Collection and Usage</h4>
            <h5>User-uploaded Images</h5>
            <p>
              When you upload images for processing, we temporarily store the
              uploaded content on our server to complete the compression and
              resizing process.The uploaded images are automatically removed
              from our server one hour after the processing is completed.
            </p>
            <h4>Web Analytics</h4>
            <p>
              We may collect and analyze non-personal analytics data, such as
              the number of visitors, the type of devices used, and geographic
              location, to improve our services and learn from user trends.
            </p>
            <h5>Information Sharing and Disclosure</h5>
            <p>
              We do not share, sell, or disclose any user-uploaded images or
              personal information to third parties unless required by law.
            </p>
            <h5>Use of Cookies</h5>
            <p>
              We may use cookies or similar technologies to enhance user
              experience and improve website functionality. By using our
              website, you consent to the use of cookies in accordance with our
              Privacy Policy.
            </p>
            <h4>No User Accounts or Personal Information</h4>
            <p>
              Our website does not require user registration or login, and we do
              not collect or store any personally identifiable information from
              our users.
            </p>
            <h4>User Responsibility and Image Ownership</h4>
            <p>
              Users are fully responsible for any data transmitted to
              imageempress.com servers.
            </p>
            <h4>Updates to this Privacy Policy</h4>
            <p>
              We reserve the right to update and modify this Privacy Policy at
              any time without notifying users. Any changes will be effective
              immediately upon posting the revised policy.
            </p>
            <h4>Contact Us</h4>
            <p>
              If you have any questions or concerns about our Privacy Policy,
              please contact us at image.empress@gmail.com.
            </p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Footer;
