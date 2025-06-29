import React, { useEffect, useState } from "react";

const SiteTracker = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    if (chrome?.storage?.local) {
      chrome.storage.local.get(null, stored => {
        setData(stored || {});
      });
    } else {
      console.warn("chrome.storage.local is not available");
    }
  }, []);

  return (
    <div>
      <h3>Tracked Websites</h3>
      <ul>
        {Object.entries(data).map(([site, time]) => (
          <li key={site}>
            {site}: {Math.floor(time / 60)} minutes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SiteTracker;
