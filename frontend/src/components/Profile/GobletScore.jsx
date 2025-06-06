import { useEffect, useState } from 'react';
import { axiosInstance } from "../../lib/axios.js";
import { Trophy } from 'lucide-react';
const GobletScore = ( ) => {
  const [rankInfo, setRankInfo] = useState(null);

  useEffect(() => {
    const fetchRank = async () => {
      try {
        const res = await axiosInstance.get('/score/rank');
        setRankInfo(res.data);
      } catch (err) {
        console.error('Error fetching rank:', err);
      }
    };

    fetchRank();
  }, []);
  if (!rankInfo) return;
  return (
    <div className="goblet-score">
      <div className="goblet-score-header">
        <Trophy className="goblet-score-icon" />
        <h2 className="goblet-title">Goblet Rank</h2>
      </div>

      <div className="goblet-value">ATR {rankInfo.rank}</div>
      
    </div>
  );
};

export default GobletScore;
