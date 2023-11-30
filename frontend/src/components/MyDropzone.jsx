import React, {
  useEffect,
  useCallback,
  useState,
  useMemo,
  useRef,
} from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "./Modal";

import axios from "axios";

const MyDropzone = () => {
  const [imageFile, setImageFile] = useState(null);
  const [downloadLinks, setDownloadLinks] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [compressedImages, setCompressedImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [files, setFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // V2.0
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState("webp");
  // V2.0

  const successNotify = () => {
    toast.success("Your Image is compressed and ready to download !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const failNotify = (msg) => {
    toast.error(`${msg}`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleSliderChange = (event) => {
    const newQuality = event.target.value;
    setQuality(newQuality); // Update state with the new slider value
  };

  const baseStyle = {
    alignItems: "center",
    padding: "3px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#c57e96",
    borderStyle: "dashed",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
    // fontSize: "7rem",
    height: "26vh",
    gap: "0",
  };

  const focusedStyle = {
    borderColor: "#c2185b",
  };

  const acceptStyle = {
    borderColor: "#3daf6c",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const clearAll = () => {
    setDownloadLinks([]);
    setUploadProgress(0);
  };

  const onDrop = useCallback(
    async (acceptedFiles) => {
      setImageFile(acceptedFiles[0]);
      // if (acceptedFiles.length > 3) {
      //   failNotify("Exceeded number of uploads.");
      // } else {
      const myFormData = new FormData();
      // myFormData.onerror = () => console.log("file reading has failed");
      acceptedFiles.forEach((file, index) => {
        setCompressedImages(file.size);

        console.log(file);
        myFormData.append(`image`, file);
        myFormData.append("format", format);
        myFormData.append("quality", quality);
        myFormData.append("width", width);
        myFormData.append("height", height);
      });
      // V2.0
      console.log(myFormData);
      // V2.0
      try {
        const config = {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        const response = await axios.post(
          "http://localhost:3001/imageapi",
          myFormData,
          config
        );
        if (response.data && response.data.imageUrl) {
          successNotify();
          console.log("here's your data:", response.data);
          setFiles((files) => [
            ...files,
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
                compariSize: response.data.comparison,
                reducedSize: response.data.compressedSize,
              })
            ),
          ]);
          setDownloadLinks((downloadLinks) => [
            ...downloadLinks,
            response.data.imageUrl,
          ]);
        }
      } catch (error) {
        failNotify("There's a problem with server. Please try again later.");
      }
      // }
      //
    },
    [quality, format, width, length, height]
  );

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    open,
  } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    multiple: false,
    maxFiles: 3,
    noClick: true,
  });

  // const imageThumbnail = useMemo(() => {
  //   // console.log()
  //   return uploadedImages.map((file, index) => <div key={index}></div>);
  // }, [uploadedImages, compressedImages]);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectChange = (event) => {
    const selectedValue = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setFormat(selectedValue);
  };

  const settings = {
    dots: true,
    infinite: false,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const linkRenderer = () => {
    return downloadLinks.length > 0 ? (
      // <div className="download-box">
      <Slider {...settings} className="my-slider">
        {console.log("FILES ARE ", files)}
        {console.log("UPLO ARE ", uploadedImages)}

        {downloadLinks.map((link, index) => (
          <div key={index}>
            <div className="image-card">
              <img
                className="thumbnail-img"
                src={files[index][0].preview}
                alt={`Thumbnail ${index}`}
                style={{
                  objectFit: "cover",
                }}
              />
              <div className="info">
                <p>
                  {files[index][0].reducedSize}KB(
                  <span className="comparison-span">
                    -{files[index][0].compariSize}%
                  </span>
                  )
                </p>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <FontAwesomeIcon icon={faDownload} /> Download
                </a>
              </div>
            </div>
            {/* <div className="download-link">
              <p>412 KB (-69%)</p>
              <a href={link} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faDownload} />
              </a>
            </div> */}
          </div>
        ))}
      </Slider>
    ) : (
      // {/* </div> */}
      <p></p>
    );
  };

  return (
    <div className="dropzone-main">
      <div className="grid">
        <div>
          {" "}
          {downloadLinks.length < 4 ? (
            <>
              <a href="#" role="button" onClick={open} className="outline">
                <FontAwesomeIcon icon={faCloudUpload} /> Select Images
              </a>
            </>
          ) : (
            <>
              <a
                href="#"
                role="button"
                onClick={() =>
                  failNotify(
                    "Reached maximum amount of files. Click 'Clear Queue' to start again."
                  )
                }
                className="outline"
                disabled
              >
                <FontAwesomeIcon icon={faCloudUpload} /> Select Images
              </a>
            </>
          )}
        </div>
        <div>
          {" "}
          <a
            href="#"
            role="button"
            onClick={() => {
              openModal();
            }}
            className="secondary outline"
          >
            <FontAwesomeIcon icon={faScrewdriverWrench} /> Settings
          </a>
        </div>
        <div>
          {" "}
          <a
            href="#"
            role="button"
            onClick={() => clearAll()}
            className="secondary outline"
          >
            <FontAwesomeIcon icon={faEraser} /> Clear Queue
          </a>
        </div>
      </div>
      <div className="progress-upload">
        {uploadProgress > 0 ? (
          <>
            <progress value={uploadProgress} max="100" />
          </>
        ) : (
          <></>
        )}
      </div>
      {downloadLinks.length < 4 ? (
        <>
          {" "}
          <input className="dropzone-i" {...getInputProps} />
          <p>
            (<FontAwesomeIcon icon={faDownload} /> Drag 'n' drop images in box
            below, or click{" "}
            <strong>
              '<FontAwesomeIcon icon={faCloudUpload} /> Select Images'
            </strong>{" "}
            button)
          </p>
        </>
      ) : (
        <>
          {" "}
          <p>
            Reached maximum amount of files. Click 'Clear Queue' to start anew.
          </p>
        </>
      )}
      <ToastContainer className="foo" style={{ width: "90vh" }} />
      {downloadLinks.length < 4 ? (
        <>
          <div
            className="my-dropzone"
            {...getRootProps({ style, className: "dropzone" })}
          >
            {linkRenderer()}
          </div>
        </>
      ) : (
        <>
          <div style={style}>
            <p>
              {" "}
              Reached maximum amount of files. Click{" "}
              <strong>'Clear All'</strong> to start new.
            </p>
            {linkRenderer()}
          </div>
        </>
      )}
      {isModalOpen && (
        <Modal onClose={closeModal} title={"Output Preferences"}>
          {/* <div>This is the content of the modal.</div> */}
          <div>
            <label for="range">
              Quality{" "}
              <abbr
                title="Your preferred quality for compressed image. The lower the value,
              the higher compression rate and more reduced size for image."
              >
                ⓘ
              </abbr>{" "}
              {quality}
              <input
                type="range"
                min="1"
                max="100"
                value={quality}
                id="range"
                name="range"
                onChange={handleSliderChange}
              />
            </label>
            <label for="formatOutput">Output Format: {format}</label>
            <select
              id="formatOutput"
              onChange={(e) => {
                setFormat(e.target.value);
              }}
            >
              <option value="webp">(Default)</option>
              <option value="webp">WebP</option>
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
              <option value="gif">GIF</option>
              <option value="avif">AVIF</option>
            </select>
            <label for="image-width">
              Width
              <input
                className="settings-input"
                type="text"
                id="image-width"
                name="image-width"
                placeholder={width}
                onChange={(e) => {
                  setWidth(e.target.value);
                }}
              />
            </label>
            <label for="image-height">
              Height
              <input
                className="settings-input"
                type="text"
                id="image-height"
                name="image-height"
                placeholder={height}
                onChange={(e) => {
                  setHeight(e.target.value);
                }}
              />
            </label>
            <label for="switch">
              <input
                type="checkbox"
                id="switch"
                name="switch"
                role="switch"
                disabled
              />
              Enable Resizing
            </label>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MyDropzone;
