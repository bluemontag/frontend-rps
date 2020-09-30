import React from 'react';
import './index.css';
import newSessionID from './random-utils';

function Status(props) {

    return <b>Played Rounds: {props.playedRounds}</b>;
}

function Button(props) {
    return (
        <button className="button" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            playedRounds: 0,
            loading: false,
            rounds: [],
            userName: newSessionID()
        };
    }

    fetchRound() {
        // ajax loading state:
        this.setState({loading: true});

        fetch('http://localhost:8081/game/playRound?userName=' + this.state.userName + '&player1Name=Player%201&player2Name=Player%202', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }})
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              loading: false,
              rounds: this.state.rounds.concat([
                    { resultId: this.state.playedRounds, p1: result.p1Choice, p2: result.p2Choice, w: result.winner }
                ]),
                playedRounds: this.state.playedRounds + 1 
            });
          },
          (error) => {
            this.setState({
              loading: false,
              error
            });
          }
        )

        
    }

    restartGame() {
        this.setState({
            rounds: [],
            playedRounds: 0
        });
    }

    render() {
        const state = this.state;
        if (state.error) {
            return "Error in request... try again in a few moments.";
        } else if (state.loading) {
            return "loading...";
        } else { 
            return (
                <div className="mainDiv">
                    <h1>Rock Paper Scissors Game</h1>
                    <br/>
                    <Button onClick={() => this.fetchRound() } value="Play Round"/>
                    <Button onClick={() => this.restartGame() } value="Restart Game"/>

                    <br/>
                    <br/>
                    <Status playedRounds={state.playedRounds} />
                    <br/>
                    <table border='2'>
                        <thead>
                            <tr>
                                <th>1st Player Choice</th><th>2nd Player Choice</th><th>Round Winner</th>
                            </tr>
                        </thead>
                        <tbody>
                        {state.rounds.map( round => (
                            <tr key={round.resultId}>
                                <td>{round.p1}</td><td>{round.p2}</td><td>{round.w}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

// ========================================

// ReactDOM.render(<Game />, document.getElementById("root"));
export default Game;