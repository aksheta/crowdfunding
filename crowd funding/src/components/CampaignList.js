import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios
      .get("/api/campaigns")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCampaigns(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
          setCampaigns([]); // Ensure campaigns is always an array
        }
      })
      .catch((error) => {
        console.error(error);
        setCampaigns([]); // Set an empty array in case of an error
      });
  }, []);

  return (
    <div>
      <h1>All Campaigns</h1>
      <ul>
        {Array.isArray(campaigns) && campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <li key={campaign._id}>
              <Link to={`/campaign/${campaign._id}`}>{campaign.title}</Link>
            </li>
          ))
        ) : (
          <p>No campaigns found.</p>
        )}
      </ul>
    </div>
  );
}

export default CampaignList;
