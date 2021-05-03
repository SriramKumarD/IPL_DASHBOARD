import { React, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { PieChart } from 'react-minimal-pie-chart';

import './TeamPage.scss';

export const TeamPage = () =>  {

  const [team, setTeam] = useState({matches : []});

  const { teamName } = useParams();

  useEffect(
    () => {
      const fetchMatches = async () => {
        const response = await fetch(`http://localhost:8080/team/${teamName}`);
        const data = await response.json();
        setTeam(data);
        console.log(data);
      };
      fetchMatches();
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
        <a href="#"> {'More >'} </a>
      </div>
    </div>
  );
}

