import React, { useEffect, useState } from "react";
import config from "../../config";

const Wider_Instock = () => {
  const [dashboardUrls, setDashboardUrls] = useState({});

  useEffect(() => {
    async function fetchDashboardUrls() {
      try {
        const response = await fetch(
          config.apiEndpoint + "/api/get_dashboard_urls/"
        );
        const data = await response.json();
        setDashboardUrls(data);
      } catch (error) {
        console.error("Error fetching dashboard URLs:", error);
      }
    }

    fetchDashboardUrls();
  }, []);

  return (
    <div className="border table_body" style={{ overflowX: "auto" }}>
      <iframe
        src={dashboardUrls.dashboard_url_9}
        width="100%"
        height="1000"></iframe>
    </div>
  );
};

export default Wider_Instock;
