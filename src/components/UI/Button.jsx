export default function Button({ children, className, textOnly, ...props }) {
    let cssClasses = textOnly ? "text-button" : "button";
    if (className) {
      cssClasses += ` ${className}`;
    }
  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}
