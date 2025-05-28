import { Trophy } from 'lucide-react';

const getScoreRating = (score) => {
  if (score >= 90) return 'Outstanding';
  if (score >= 80) return 'Excellent';
  if (score >= 70) return 'Very Good';
  if (score >= 60) return 'Good';
  if (score >= 50) return 'Average';
  return 'Needs Improvement';
};

const getScoreDescription = (score) => {
  if (score >= 90) {
    return 'Exceptional performance across all areas. A top performer who consistently exceeds expectations.';
  }
  if (score >= 80) {
    return 'Excellent performance with strong skills in most areas. Consistently meets and often exceeds expectations.';
  }
  if (score >= 70) {
    return 'Very good performance with solid skills. Reliably meets expectations with occasional excellence.';
  }
  if (score >= 60) {
    return 'Good performance with satisfactory skills. Meets expectations but has room for improvement in some areas.';
  }
  if (score >= 50) {
    return 'Average performance. Meets basic expectations but needs improvement in several areas.';
  }
  return 'Performance below expectations. Significant improvement needed across multiple areas.';
};

const GobletScore = ({ score }) => {
  return (
    <div className="goblet-score">
      <div className="goblet-score-header">
        <Trophy className="goblet-score-icon" />
        <h2 className="goblet-title">Goblet Score</h2>
      </div>

      <div className="goblet-value">ATR 001</div>
      <div className="goblet-score-rating">{getScoreRating(score)}</div>

      <p className="goblet-subtitle">{getScoreDescription(score)}</p>
    </div>
  );
};

export default GobletScore;
