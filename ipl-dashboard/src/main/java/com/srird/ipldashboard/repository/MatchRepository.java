package com.srird.ipldashboard.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.srird.ipldashboard.model.Match;

@Repository
public interface MatchRepository extends CrudRepository<Match, Long> {
	
	List<Match> getByTeam1OrTeam2OrderByDateDesc(String teamName1, String teamName2,Pageable pageable);

	default List<Match> findLatestMatchesByTeam(String teamName, int count) {
		
		return getByTeam1OrTeam2OrderByDateDesc(teamName, teamName,PageRequest.of(0, count));
		
	}
	
	@Query("select m from Match m where (m.team1 = :teamName or m.team2 = :teamName) and m.date between :startDate and :endDate order by date desc" )
	List<Match> getMatchesByTeamBetweenDates(
			@Param("teamName") String teamName, 
			@Param("startDate") LocalDate startDate, 
			@Param("endDate") LocalDate endDate);
}
