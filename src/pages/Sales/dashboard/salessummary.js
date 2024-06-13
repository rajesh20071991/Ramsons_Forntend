import React, { useEffect, useState } from "react";
import config from "../../../config";

const Sales_Summary = () => {
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
    <div
      className="border table_body"
      style={{ overflowX: "auto", fontSize: "20px" }}>
      {/* Render iframe with the URL of sales summary dashboard */}
      <iframe
        src={dashboardUrls.dashboard_url_8}
        width="100%"
        height="1000"
        title="Sales Summary Dashboard"></iframe>
    </div>
  );
};

export default Sales_Summary;
