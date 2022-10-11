import React, { useEffect, useState } from "react";

export function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(getIsDocumentHidden());
  const onVisibilityChange = () => setIsVisible(getIsDocumentHidden());
  useEffect(() => {
    const visibilityChange = getBrowserVisibilityProp();
    document.addEventListener(visibilityChange, onVisibilityChange, false);
    return () => {
      document.removeEventListener(visibilityChange, onVisibilityChange);
    };
  });
  return isVisible;
}

export function getBrowserVisibilityProp() {
  if (typeof document.hidden !== "undefined") {
    // Opera 12.10 and Firefox 18 and later support
    return "visibilitychange";
  } else if (typeof document.msHidden !== "undefined") {
    return "msvisibilitychange";
  } else if (typeof document.webkitHidden !== "undefined") {
    return "webkitvisibilitychange";
  }
}
export function getBrowserDocumentHiddenProp() {
  if (typeof document.hidden !== "undefined") {
    return "hidden";
  } else if (typeof document.msHidden !== "undefined") {
    return "msHidden";
  } else if (typeof document.webkitHidden !== "undefined") {
    return "webkitHidden";
  }
}
export function getIsDocumentHidden() {
  return !document[getBrowserDocumentHiddenProp()];
}
