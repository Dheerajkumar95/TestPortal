import { useEffect } from "react";

const usePreventCopyBlur = () => {
  useEffect(() => {
    const handleBlurEffect = () => {
      document.body.classList.add("blurred");
      setTimeout(() => document.body.classList.remove("blurred"), 2000);
    };

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    // Disable right-click
    const handleContextMenu = (e) => e.preventDefault();

    const handleKeyDown = (event) => {
      // Disable Ctrl+C, Ctrl+U, Ctrl+Shift+I
      if (
        (event.ctrlKey || event.metaKey) &&
        (event.key.toLowerCase() === "c" || event.key.toLowerCase() === "u")
      ) {
        event.preventDefault();
      }

      // Disable F12 (DevTools)
      if (event.key === "F12") {
        event.preventDefault();
      }

      // Disable Ctrl+Shift+I
      if (
        event.ctrlKey &&
        event.shiftKey &&
        event.key.toLowerCase() === "i"
      ) {
        event.preventDefault();
      }

      // Disable Cmd (Mac)
      if (event.key === "Meta" || event.code === "OS") {
        document.body.classList.add("blurred");
        handleBlurEffect();
      }

      // Disable Escape
      if (event.key === "Escape") {
        event.preventDefault();
      }

      // Disable PrintScreen
      if (event.key === "PrintScreen") {
        event.preventDefault();
        document.body.classList.add("blurred");
        handleBlurEffect();
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "Meta" || event.code === "OS") {
        document.body.classList.remove("blurred");
        handleBlurEffect();
      }

      if (event.key === "PrintScreen") {
        document.body.classList.add("blurred");
        setTimeout(() => document.body.classList.remove("blurred"), 2000);
      }
    };

    // iOS specific
    const handleTouchStart = () => {
      handleBlurEffect();
      document.body.classList.add("blurred");
    };

    const handleTouchEnd = () => {
      document.body.classList.remove("blurred");
    };

    // Attach events
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
