import React, { useState, useCallback, useEffect } from 'react';
import { Router } from 'wouter';

const currentLocation = () => {
  return window.location.hash.replace(/^#/, "") || "/";
};

const useHashLocation = () => {
  const [loc, setLoc] = useState(currentLocation());

  useEffect(() => {
    const handler = () => setLoc(currentLocation());

    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = useCallback(to => (window.location.hash = to), []);

  return [loc, navigate];
};

export default ({ children }) => {
  return <Router hook={useHashLocation}>
    {children}
  </Router>;
}