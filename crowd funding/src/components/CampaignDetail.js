import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CampaignDetail() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    axios.get(`/api/campaigns/${id}`)
      .then(response => setCampaign(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleDonate = () => {
    axios.post(`/api/campaigns/${id}/donate`, { amount })
      .then(response => setCampaign(response.data))
      .catch(error => console.error(error));
  };

  if (!campaign) return <div>Loading...</div>;

  return (
    <div>
      <h1>{campaign.title}</h1>
      <p>{campaign.description}</p>
      <p>Goal: ${campaign.goal}</p>
      <p>Raised: ${campaign.raised}</p>
      <div>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleDonate}>Donate</button>
      </div>
    </div>
  );
}

export default CampaignDetail;