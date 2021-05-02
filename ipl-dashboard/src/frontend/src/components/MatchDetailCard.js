import { React } from 'react';

export const MatchDetailCard = ({match}) =>  {

  if(!match) return null;
  return (
    <div className="MatchDetailCard">
      <h2>Latest Matches</h2>
      <h4>Match Details</h4>
      <h4>{match.team1} vs {match.team2}</h4>
      
    </div>
  );
}

