import React, { useState } from 'react';

const ButtonWithMessage = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (event) => {
    setShowMessage(true);
    setPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setShowMessage(false);
  };

  return (
    <div>
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Hover Me
      </button>
      {showMessage && (
        <p
          style={{
            position: 'fixed',
            top: position.y,
            left: position.x,
          }}
        >
          Message displayed near the cursor.
        </p>
      )}
    </div>
  );
};

export default ButtonWithMessage;
