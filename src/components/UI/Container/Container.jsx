import React from "react";

const Container = React.memo(({ children, className = "", style = {} }) => {
  return (
    <div
      className={`min-h-screen flex justify-center items-center max-w-7xl mx-auto px-4 text-white ${className}`}
      style={style}
      aria-live="polite" // ✅ Moved the explanation below as a comment
    >
      {children}
    </div>
  );
});

export default Container;

/*
  Notes:
  - aria-live="polite": Makes screen readers announce changes inside this container politely (non-interruptive).
*/
