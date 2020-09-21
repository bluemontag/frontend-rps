import React from 'react';
import './index.css';

class GameStats extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoaded : false,
            totalRounds : 0,
            totalWinsP1 : 0,
            totalWinsP2 : 0,
            totalDraws  : 0
        };
    }

    componentDidMount() {
        fetch('http://localhost:8081/game/getGameStats')
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                totalRounds: result.totalRounds,
                totalWinsP1: result.totalWinsP1,
                totalWinsP2: result.totalWinsP2,
                totalDraws: result.totalDraws
              });
            },
            // Nota: es importante manejar errores aquí y no en 
            // un bloque catch() para que no interceptemos errores
            // de errores reales en los componentes.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }

    render() {
        const state = this.state;
        if (state.error) {
            return "Error on fetching statistics to the server... try again in a few moments.";
        } else if (!state.isLoaded) {
            return "Loading...";
        } else {
          return (
            <div className="mainDiv">
                    <h1>Game Statistics</h1>
                    <br/>
                    <br/>
                    <table border='2'>
                        <thead>
                            <tr>
                                <th>Total Rounds in Server</th><th>Total Wins Player 1</th><th>Total Wins Player 2</th><th>Total Draws</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key='1'>
                                <td>{state.totalRounds}</td><td>{state.totalWinsP1}</td><td>{state.totalWinsP2}</td><td>{state.totalDraws}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                );
        }
    }
}

// ========================================

// ReactDOM.render(<GameStats />, document.getElementById("root"));

export default GameStats;