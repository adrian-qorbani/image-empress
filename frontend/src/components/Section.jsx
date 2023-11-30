import React from "react";

import MyDropzone from "./MyDropzone";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BuyMeACoffee from "./BuyMeACoffee";


const mySlider = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  return (
    <>
      <div>
        <h2> Single Item</h2>
        <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    </>
  );
};

const Section = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="grid container-fluid">
        <div>
          <hgroup>
            <h2>{t('headerText')}</h2>
            <h3 className="desc">
            {t('headerDesc1')}{" "}
              <span id="rocket">
                <FontAwesomeIcon icon={faRocket} />
              </span>
              <em>
                <strong>{t('headerDesc2')}</strong>
              </em>
            </h3>
          </hgroup>
          <p className="desc">
            {/* FotoFusion offers <strong>lightning-fast</strong> image compression
            processing, capable of efficiently compressing and reduce the size
            of up to <em>10</em> large images to common formats;{" "}
            <strong>JPEG</strong>, <strong>PNG</strong>, <strong>WebP</strong>,{" "}
            <strong>GIF</strong> and <strong>AVIF</strong>. You can edit the
            image parameters to your preference. All processed images are
            deleted <em>30 minutes</em> after upload. */}
            {t('mainDesc')}
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
