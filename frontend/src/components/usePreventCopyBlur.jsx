import { useEffect } from "react";
import toast from 'react-hot-toast';

const usePreventCopyBlur = () => {
  useEffect(() => {
    const handleBlurEffect = () => {
      document.body.classList.add("blurred");
      setTimeout(() => document.body.classList.remove("blurred"), 2000);
    };

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    const handleContextMenu = (e) => e.preventDefault();

    const handleKeyDown = (event) => {
      const tag = event.target.tagName.toLowerCase();
      const isInput = tag === 'input' || tag === 'textarea';

      // Allow typing inside input/textarea
      if (isInput) return;

      // Block Ctrl+C, Ctrl+U
      if (
        (event.ctrlKey || event.metaKey) &&
        (event.key.toLowerCase() === "c" || event.key.toLowerCase() === "u")
      ) {
        toast.error("You can't copy");
        event.preventDefault();
      }

      // Block F12
      if (event.key === "F12") {
        event.preventDefault();
      }

      // Block Ctrl+Shift+I
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "i") {
        event.preventDefault();
      }

      // Block PrintScreen
      if (event.key === "PrintScreen") {
        document.body.classList.add("blurred");
        handleBlurEffect();
        event.preventDefault();
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "PrintScreen") {
        document.body.classList.add("blurred");
        handleBlurEffect();
      }
    };

    const handleTouchStart = () => {
      handleBlurEffect();
      document.body.classList.add("blurred");
    };

    const handleTouchEnd = () => {
      document.body.classList.remove("blurred");
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    if (isIOS) {
      document.addEventListener("touchstart", handleTouchStart);
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      if (isIOS) {
        document.removeEventListener("touchstart", handleTouchStart);
        document.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, []);
};

export default usePreventCopyBlur;
