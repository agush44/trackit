const Button = ({ onClick, children, isLoading, disabled, className = "" }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`px-6 py-2 font-medium text-white w-fit rounded  transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <Loader className="animate-spin" size={16} />
          Cargando...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
