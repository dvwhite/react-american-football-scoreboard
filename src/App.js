//TODO: STEP 1 - Import the useState hook.
import React, {useState} from "react";
import "./App.css";
import BottomRow from "./BottomRow";

function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  const increaseScore = (team, amount) => {
    switch(team) {
      case 'home':
        setHomeScore(homeScore + amount);
        break;
      case 'away':
        setAwayScore(awayScore + amount);
        break;
      default: 
      // Do nothing
    }
  }

  return (
    <div className="container">
      <ScoreBoard className="scoreboard" topRowClassName="topRow" homeScore={homeScore} awayScore={awayScore} />
      <Buttons className="buttons" buttonGroups={[ 
        <ButtonGroup className="homeButtons" buttons={[
          <ScoreUpdater className="homeButtons__touchdown" text="Home Touchdown" onUpdateScore={() => {increaseScore('home', 7)}} />,
          <ScoreUpdater className="homeButtons__fieldGoal" text="Home Field Goal" onUpdateScore={() => {increaseScore('home', 3)}} />
        ]} />,

        <ButtonGroup className="homeButtons" buttons={[
          <ScoreUpdater className="awayButtons__touchdown" text="Away Touchdown" onUpdateScore={() => {increaseScore('away', 7)}} />,
          <ScoreUpdater className="awayButtons__fieldGoal" text="Away Field Goal" onUpdateScore={() => {increaseScore('away', 3)}} />
        ]} />
      ]} />
    </div>
  );
}

function ScoreBoard(props) {
  const {homeScore, awayScore, className, topRowClassName} = props;

  return (
    <section className={className}>
      <TopRow className={topRowClassName} homeScore={homeScore} awayScore={awayScore} />
      <BottomRow />
    </section>
  );
}

function Buttons(props) {
  const {className, buttonGroups} = props;
  return (
    <section className={className}>
      {
        buttonGroups.map(buttonGroup => buttonGroup)
      }
    </section>
  );
}

function ButtonGroup(props) {
  const {className, buttons} = props;
  console.log(buttons)
  return (
    <div className={className}>
      {
        buttons.map(button => button)
      }
    </div>
  );
}

function TopRow(props) {
  const {className, homeScore, awayScore} = props;
  return (
    <div className={className}>
      <ScoreReporter className="home" headingClass="home__name" team="Lions" scoreClass="home__score" score={homeScore} />
      <Timer className="timer" time="00:03" />
      <ScoreReporter className="away" headingClass="away__name" team="Tigers" scoreClass="away__score" score={awayScore} />
    </div>
  );
}

function ScoreReporter(props) {
  const {className, headingClass, team, scoreClass, score} = props;
  return (
    <div className={className}>
      <h2 className={headingClass}>{team}</h2>
      <div className={scoreClass}>{score}</div>
    </div>
  );
}

function ScoreUpdater(props) {
  const {className, onUpdateScore, text} = props;
  return (
    <button className={className} onClick={onUpdateScore}>{text}</button>
  );
}

function Timer(props) {
  const {className, time} = props;
  return (
    <div className={className}>{time}</div>
  );
}

export default App;
