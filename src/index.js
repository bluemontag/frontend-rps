import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Game from "./play";
import GameStats from "./game-stats";

 const rootElement = document.getElementById("root");
 ReactDOM.render(

   <BrowserRouter>
        <a href="./play" class="button">Play Rock Paper Scissors!</a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a href="./stats"class="button">Game Statistics</a>
    <Switch>
     <Route path="/play" component={Game} />
     <Route path="/stats" component={GameStats} />
   </Switch>
   </BrowserRouter>,
   rootElement
 );