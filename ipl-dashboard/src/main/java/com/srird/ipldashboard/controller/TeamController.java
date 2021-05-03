package com.srird.ipldashboard.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srird.ipldashboard.model.Match;
import com.srird.ipldashboard.model.Team;
import com.srird.ipldashboard.repository.MatchRepository;
import com.srird.ipldashboard.repository.TeamRepository;

@RestController
@CrossOrigin
public class TeamController {
	
	@Autowired
	private TeamRepository teamRepository;
	
	@Autowired
	private MatchRepository matchRepository;
	
	@GetMapping("/team/{teamName}")
	public Team getTeam(@PathVariable String teamName) {
		
		Team team = teamRepository.findByTeamName(teamName);
		
		team.setMatches(matchRepository.findLatestMatchesByTeam(teamName, 4));
		
		return team;
		
	}
	
	@GetMapping("/team/{teamName}/matches")
	public List<Match> getMatchesForTeam(@PathVariable String teamName, @RequestParam("year") int year) {
		
		LocalDate startDate = LocalDate.of(year, 1, 1);
		LocalDate endDate = LocalDate.of(year + 1, 1, 1);
		
		return matchRepository.getMatchesByTeamBetweenDates(teamName, startDate, endDate);
		
	}

}
