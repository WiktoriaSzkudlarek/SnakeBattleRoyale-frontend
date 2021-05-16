import React from 'react';
import buttonImage from './media/button_blank.png';
import buttonImageJoinGame from './media/text.png';
import buttonImageTurnLeft from './media/arrow.png';

class LeftColumn extends React.Component {
    constructor(props) {
        super(props);

        this.joinGameButton = this.joinGameButton.bind(this);
        this.turnLeftButton = this.turnRightButton.bind(this);
    }

    joinGameButton() {
        return(
            <button
            onClick={() => this.props.joinGame()}
            class="leftButton" >
            <img src={buttonImage}/>
            <img src={buttonImageJoinGame}/>
            
            </button>
        );
    }
    
    turnRightButton() {
        return(
            <button
            onClick={(e) => this.props.move(37)}
            class="leftButton">
            <img src={buttonImage}/>
            <img src={buttonImageTurnLeft}/>
            </button>
        );
    }

    render() {
        return(
            <div id="leftColumn">
                <div className="sendName">
                  <label htmlFor="nameInput">Podaj swe imię:</label>
                  <input name="name" id="nameInput"
                    onChange={(name) => {this.props.setName(name)}} type="text" value={this.props.name}
                    placeholder="Jacek"/>
                </div>
                <div>
                    {this.props.time === undefined ? this.joinGameButton() : this.turnRightButton()}

                </div>
            </div>
        )
    }



}

export default LeftColumn;
