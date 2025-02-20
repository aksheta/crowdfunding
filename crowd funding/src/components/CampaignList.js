import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios.get('/api/campaigns')
      .then(response => setCampaigns(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>All Campaigns</h1>
      <ul>
        {campaigns.map(campaign => (
          <li key={campaign._id}>
            <Link to={`/campaign/${campaign._id}`}>{campaign.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CampaignList;