import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import config from "../../config";

const { TabPane } = Tabs;

const PipeSTubSummary = () => {
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
      <Tabs defaultActiveKey="1">
        <TabPane tab="Summary" key="1">
          <iframe
            src={dashboardUrls.dashboard_url_7}
            width="100%"
            height="600"></iframe>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PipeSTubSummary;
