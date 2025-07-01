const Button = ({
  label,
  iconURL,
  backgroundColor,
  textColor,
  borderColor,
  fullWidth,
  onClick,
  href,
}) => {
  const handleClick = (e) => {
    if (href) {
      window.location.href = href;
    }
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <button
      onClick={handleClick}
      className={`
        inline-flex justify-center items-center gap-2 px-4 py-2 border
        font-paragraph text-p3 leading-none rounded-full cursor-pointer
        ${
          backgroundColor && textColor && borderColor
            ? `${backgroundColor} ${textColor} ${borderColor}`
            : "bg-secondary-yellow text-primary border-transparent"
        }
        ${fullWidth ? "w-full" : "w-auto"}
      `}
    >
      {label}

      {iconURL && (
        <img
          src={iconURL}
          alt="icon"
          className="ml-2 rounded-full bg-white w-5 h-5"
        />
      )}
    </button>
  );
};

export default Button;