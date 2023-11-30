import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const Header = () => {
  // Config
  const isOpenClass = "modal-is-open";
  const openingClass = "modal-is-opening";
  const closingClass = "modal-is-closing";
  const animationDuration = 400; // ms
  let visibleModal = null;
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Toggle modal
  const toggleModal = (event) => {
    event.preventDefault();
    const modal = document.getElementById(
      event.currentTarget.getAttribute("data-target")
    );
    typeof modal != "undefined" && modal != null && isModalOpen(modal)
      ? closeModal(modal)
      : openModal(modal);
  };

  // Is modal open
  const isModalOpen = (modal) => {
    return modal.hasAttribute("open") && modal.getAttribute("open") != "false"
      ? true
      : false;
  };

  // Open modal
  const openModal = (modal) => {
    if (isScrollbarVisible()) {
      document.documentElement.style.setProperty(
        "--scrollbar-width",
        `${getScrollbarWidth()}px`
      );
    }
    document.documentElement.classList.add(isOpenClass, openingClass);
    setTimeout(() => {
      visibleModal = modal;
      document.documentElement.classList.remove(openingClass);
    }, animationDuration);
    modal.setAttribute("open", true);
  };

  // Close modal
  const closeModal = (modal) => {
    visibleModal = null;
    document.documentElement.classList.add(closingClass);
    setTimeout(() => {
      document.documentElement.classList.remove(closingClass, isOpenClass);
      document.documentElement.style.removeProperty("--scrollbar-width");
      modal.removeAttribute("open");
    }, animationDuration);
  };

  // Close with a click outside
  document.addEventListener("click", (event) => {
    if (visibleModal != null) {
      const modalContent = visibleModal.querySelector("article");
      const isClickInside = modalContent.contains(event.target);
      !isClickInside && closeModal(visibleModal);
    }
  });

  // Close with Esc key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && visibleModal != null) {
      closeModal(visibleModal);
    }
  });

  // Get scrollbar width
  const getScrollbarWidth = () => {
    // Creating invisible container
    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.overflow = "scroll"; // forcing scrollbar to appear
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement("div");
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
  };

  // Is scrollbar visible
  const isScrollbarVisible = () => {
    return document.body.scrollHeight > screen.height;
  };
  return (
    <>
      <dialog id="modal-second">
        <article>
          <a
            href="#"
            aria-label="Close"
            className="close"
            data-target="modal-second"
            onClick={(e) => toggleModal(e)}
          ></a>
          <h4>Donate</h4>
          <p>
            «Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam eaque ipsa,
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas »
          </p>
          <footer>
            <a
              href="#"
              role="button"
              className="secondary"
              data-target="modal-second"
              onClick={(e) => toggleModal(e)}
            >
              Close
            </a>
          </footer>
        </article>
      </dialog>
      <nav className="container-fluid">
        <ul>
          <li>
            <strong>FotoFusion.com</strong>
          </li>
        </ul>
        <ul>
          {/* <li>
            <a href="">Image Compressor</a>
          </li>{" "}
          |
          <li>
            <a href="">Image Editor</a>
          </li>{" "}
          | */}
          <li>
            <details role="list" dir="rtl">
              <summary
                aria-haspopup="listbox"
                role="link"
                className="lang-selection"
              >
                {t("lang")}
              </summary>
              <ul role="listbox">
                <li>
                  <a onClick={(e) => changeLanguage("en")}>English</a>
                </li>
                <li>
                  <a onClick={(e) => changeLanguage("fr")}>French</a>
                </li>
              </ul>
            </details>
          </li>
          <li></li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
