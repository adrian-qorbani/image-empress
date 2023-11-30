const BuyMeACoffee = () => {
  return (
    <div className="donation-div">
      {/* <hgroup>
        <h3>
          Do you like <span className="foto-name">FotoFusion</span>?
        </h3>
        <h5>
          FotoFusion services are free, however you can support me with a small cup of coffee ;)
        </h5>
      </hgroup> */}
      <p>
        Do you like <span className="foto-name">FotoFusion</span>? FotoFusion services are free, however you can support me with just a small
        cup of coffee :)
      </p>
      <a href="https://www.buymeacoffee.com/adrighorbap" target="_blank">
        <img
          src="../public/default-white.webp"
          alt="Buy Me A Coffee"
          style={{
            height: "60px",
            width: "217px",
            border: "2px solid",
          }}
        />
      </a>
    </div>
  );
};

export default BuyMeACoffee;
