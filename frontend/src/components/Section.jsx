import React from "react";
import MyDropzone from "./MyDropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BuyMeACoffee from "./BuyMeACoffee";

const Section = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="grid container-fluid">
        <div>
          <hgroup>
            <h2>{t("headerText")}</h2>
            <h3 className="desc">
              {t("headerDesc1")}{" "}
              <span id="rocket">
                <FontAwesomeIcon icon={faRocket} />
              </span>
              <em>
                <strong>{t("headerDesc2")}</strong>
              </em>
            </h3>
          </hgroup>
          <p className="desc">
            ImageEmpress offers <strong>lightning-fast</strong> image
            compression, optimization, format conversion and resizing, capable
            of efficiently compressing and reduce the size of up to <em>10</em>{" "}
            large images to common formats; <strong>JPEG</strong>,{" "}
            <strong>PNG</strong>, <strong>WebP</strong>, <strong>GIF</strong>{" "}
            and <strong>AVIF</strong>. You can edit the image parameters to your
            preference. All processed images are deleted from server after 30
            minutes.
            {/* {t("mainDesc")} */}
          </p>
        </div>
      </div>
      <div className="grid container-fluid">
        <div>
          <MyDropzone />
          <BuyMeACoffee />
        </div>
      </div>
    </>
  );
};

export default Section;
