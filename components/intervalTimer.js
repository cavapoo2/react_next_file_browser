import React, { Component } from 'react';
class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = { seconds: 0, toggle: false };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        if (this.props.toggleStopStart === true) {
            this.setState({
                seconds: 0,
                toggle:!this.state.toggle,
            })

        } else {
            this.setState({
                seconds: this.state.seconds + 1,
            });
        }
        this.props.elapsedTime(this.state.seconds)
    }
    render() {
        return (
            <div>
                <h2>Timer: {this.state.seconds.toString()}</h2>
            </div>
        );
    }
}
  export default Clock;