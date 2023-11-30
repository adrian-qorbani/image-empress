import { useTranslation } from "react-i18next";

const Header = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <nav className="container-fluid">
        <ul>
          <li>
            <strong>ImageEmpress.com</strong>
          </li>
        </ul>
        <ul>
          <li>
            {/* <details role="list" dir="rtl">
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
            </details> */}
          </li>
          <li></li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
