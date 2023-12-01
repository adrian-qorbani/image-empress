const BuyMeACoffee = () => {
  return (
    <div className="donation-div">
      <p>
        Do you like <span className="foto-name">ImageEmpress</span>?
        ImageEmpress services are free, and I plan to turn this website into a
        full-fledged online image editor with modern features over time. You can
        support me with just a small cup of coffee :)
      </p>
      <a href="https://www.buymeacoffee.com/adrighorbap" target="_blank">
        <img
          src="../default-white.webp"
          alt="Buy Me A Coffee"
          style={{
            height: "60px",
            width: "217px",
          }}
        />
      </a>
    </div>
  );
};

export default BuyMeACoffee;
