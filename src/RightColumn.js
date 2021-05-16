import React from 'react';
import buttonImage from './media/button_blank.png';
import buttonImageTurnRight from './media/arrow.png';

class RightColumn extends React.Component {
    constructor(props) {
        super(props);

        this.turnLeftButton = this.turnRightButton.bind(this);
    }

    turnRightButton() {
      return(
          <button
          onClick={(e) => this.props.move(39)}
          class="rightButton"
          id="rightColumnButton">
          <img src={buttonImage}/>
          <img src={buttonImageTurnRight}/>
          </button>
      );
  }

    render() {
        return (
          <div id="RightColumn">
            <div id="players">

              <h2>Lista graczy</h2>
                <ul>
                {
                    this.props.player_list.map((i, k) => {
                        return <li key={k} style={{background: `rgb(30, ${(44 + (k+1) * 15)%256}, ${(40 + (k+1) * 5 )%256})`}} >{i}</li>
                    })
                }
                </ul>
            </div>
            <div>

                {this.props.time === undefined ? "" : this.turnRightButton()}

            </div>
          </div>
        );

    }

}

export default RightColumn;
