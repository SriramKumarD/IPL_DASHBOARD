import { React, useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { PieChart } from 'react-minimal-pie-chart';

import './TeamPage.scss';

export const TeamPage = () =>  {

  const [team, setTeam] = useState({matches : []});

  const { teamName } = useParams();

  useEffect(
    () => {
      const fetchTeam = async () => {
        const response = await fetch(`http://localhost:8080/team/${teamName}`);
        const data = await response.json();
        setTeam(data);
        console.log(data);
        console.log("testT");
      };
      fetchTeam();
    }, [teamName]
  );

  if(! team || ! team.teamName){
   return <h1> Team Not Found </h1>
  }
  return (
    <div className="TeamPage">
      <div className="team-name-section">
        <h1 className="team-name">{team.teamName}</h1>
      </div>
      <div className="win-loss-section">
        <span className="vs">Wins / Losses</span>
        <PieChart
        data={[
          { title: 'Losses', value: team.totalMatches - team.totalWins, color: '#e15454' },
          { title: 'Wons', value: team.totalWins, color: '#4da375' },
         ]}
       />
      </div>
      <div className="match-detail-section">
         <h2>Latest Matches</h2>
        <MatchDetailCard teamName = {team.teamName} match = {team.matches[0]}/>
      </div>
       {team.matches.slice(1).map( match => <MatchSmallCard teamName = {team.teamName} match ={match}/>)} 
      <div class="more-link">
        <Link to={`/teams/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}> {'More >'} </Link>
      </div>
    </div>
  );
}

