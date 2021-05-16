import React from 'react';
import './App.css';
import io from 'socket.io-client';
import LeftColumn from './LeftColumn.js';
import Board from './Board.js';
import RightColumn from './RightColumn.js';

class App extends React.Component {
    constructor (props) {
        super(props);
        const socket = io("http://animeiman.ga:5070");

        this.state = {
            map: [],
            mapSize: 50,
            name: "",
            player_list: [],
            socket: socket,
            timeToStart: -1,
            time: undefined
        };

        socket.on("map", (msg) => {
            this.setState({map: msg.map});
        });

        socket.on("mapInfo", (msg) => {
            this.setState({mapSize: msg.size});
        });

        socket.on("player_list", (msg) => {
            this.setState({player_list: msg.players});
        });

        socket.on("timeToStart", (msg) => {
            if(this.state.time !== undefined) clearInterval(this.state.time);

            this.setState({timeToStart: msg.time, time: setInterval(() => {this.setCountdown()}, 1000)});
        });

//         socket.on("winner", (msg) => {
//            this.setState({timeToStart: msg.winner + " won🎂"});
//         });


    };

    //
    componentDidMount() {
        window.addEventListener("keydown", (x) => this.move(x.keyCode));
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", (x) => this.move(x.keyCode));
    }


    joinGame() {
        this.state.socket.emit("join_game", {name: this.state.name});
    }

    setName(name) {
        this.setState({name: name.target.value.substring(0, 32)})
    }

    move(code) {

        switch(code) {
            case 13:
                this.joinGame();
                break;
                
            case 37:
                this.state.socket.emit("move", {direction: 0});
                break;

            case 39:
                this.state.socket.emit("move", {direction: 1});
                break;

        }
    }

    setCountdown() {
        if
            (this.state.timeToStart<1) clearInterval(this.state.time)

        else
            this.setState({timeToStart: this.state.timeToStart-1});
    }
    
    //--------

    render() {
        return (
            <div id="app">
                <LeftColumn
                    joinGame={() => {this.joinGame()}}
                    setName={(name) => {this.setName(name)}}
                    name={this.state.name}
                    time={this.state.time}
                    move={(e) => {this.move(e)}}
                />

                <Board
                    map={this.state.map}
                    timeToStart={this.state.timeToStart}
                    mapSize={this.state.mapSize}
                />

                <RightColumn
                    player_list={this.state.player_list}
                    timeToStart={this.state.timeToStart}
                    time={this.state.time}
                    move={(e) => {this.move(e)}}
                />
            </div>
        );
    }
}

export default App;
