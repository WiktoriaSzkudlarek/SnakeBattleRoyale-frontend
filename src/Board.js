import React from 'react';

class Board extends React.Component {
    constructor (props) {
     super(props);

     this.squareRef = React.createRef()
     this.state = {
         height: 0,
         width: 0
     }
    }

    resizeSquares() {

      if (this.squareRef.current.offsetWidth > window.innerHeight)
        {
          this.setState({width: window.innerHeight *.95, height: window.innerHeight*.95});

        }
      else {
        this.setState({width: this.squareRef.current.offsetWidth*.95, height: this.squareRef.current.offsetWidth*.95});
      }
    }

    componentDidMount () {
      this.resizeSquares();
      window.addEventListener('resize', () =>  this.resizeSquares());
    }

    componentWillUnmount() {
        window.removeEventListener("resize", () => this.resizeSquares());

    }

    render() {
        let squares= [];
                        for(let i=0; i<this.props.map.length; i++) {
                            squares.push(<Square value={this.props.map.charCodeAt(i) - 49} key={i}/>)
                  }


        return (
            <div id="middleColumn"
              ref={this.squareRef}
            >
                <div id="board"
                  style={{height: this.state.height, width: this.state.width,
                    gridTemplateColumns: `repeat(${this.props.mapSize},1fr )`,
                    gridTemplateRows: `repeat(${this.props.mapSize},1fr )`}}
                >
                    {

                        /*
                        this.props.map.map((i, k) => {
                            return i.map((j, l) => {
                            return <Square value={j} key={l*(50)+k} />
                            });
                        })
                        */
                        squares
                    }
                </div>


                <p id="countdown">
                {

                }

                {
                    this.props.timeToStart === -1 ? "" : this.props.timeToStart
                }
                </p>
            </div>
        );
    }
}

class Square extends React.PureComponent {
    getColor() {
        switch(this.props.value) {
            case -1:    return "#394053";
            case 0:     return "#75B38A";
            default:     return `rgb(30, ${(44 + this.props.value * 15)%256}, ${(40 + this.props.value * 5)%256})`;
        }
    }

    render() {
        return (
            <div className="square" style={{background: this.getColor()}}>
            </div>
        );
    }
}


export default Board;
