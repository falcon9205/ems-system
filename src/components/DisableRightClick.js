// components/DisableRightClick.js
import { useEffect } from 'react';

const DisableRightClick = ({ children }) => {
  useEffect(() => {
    const disableRightClick = (e) => {
      e.preventDefault();
    };

    // Disable right-click globally
    document.addEventListener('contextmenu', disableRightClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
    };
  }, []);

  return <>{children}</>;
};

export default DisableRightClick;
