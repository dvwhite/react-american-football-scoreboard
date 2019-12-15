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
      <ScoreBoard className="scoreboard" homeScore={homeScore} awayScore={awayScore} />
      <section className="buttons">
        <ButtonGroup className="homeButtons" buttons={[
          <ScoreUpdater className="homeButtons__touchdown" text="Home Touchdown" onUpdateScore={() => {increaseScore('home', 7)}} />,
          <ScoreUpdater className="homeButtons__fieldGoal" text="Home Field Goal" onUpdateScore={() => {increaseScore('home', 3)}} />
        ]} />

        <ButtonGroup className="homeButtons" buttons={[
          <ScoreUpdater className="awayButtons__touchdown" text="Away Touchdown" onUpdateScore={() => {increaseScore('away', 7)}} />,
          <ScoreUpdater className="awayButtons__fieldGoal" text="Away Field Goal" onUpdateScore={() => {increaseScore('away', 3)}} />
        ]} />
      </section>
    </div>
  );
}

function ScoreBoard(props) {
  const {homeScore, awayScore, className} = props;

  return (
    <section className={className}>
      <TopRow homeScore={homeScore} awayScore={awayScore} />
      <BottomRow />
    </section>
  );
}

// <Buttons className="buttons" />
function Buttons(props) {
  const {className, childClassName} = props;
  return (
    <section className={className}>
      <ButtonGroup className={childClassName} />
    </section>
  );
}

// <ButtonGroup className="" />
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
  const {homeScore, awayScore} = props;
  return (
    <div className="topRow">
      <div className="home">
        <h2 className="home__name">Lions</h2>
        <div className="home__score">{homeScore}</div>
      </div>
      <div className="timer">00:03</div>
      <div className="away">
        <h2 className="away__name">Tigers</h2>
        <div className="away__score">{awayScore}</div>
      </div>
    </div>
  );
}

function ScoreUpdater(props) {
  const {className, onUpdateScore, text} = props;
  return (
    <button className={className} onClick={onUpdateScore}>{text}</button>
  );
}

export default App;
