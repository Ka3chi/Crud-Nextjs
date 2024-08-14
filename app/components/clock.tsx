import React, { Component } from 'react';

class Clock extends Component {
  state = {
    time: '',
  };

  private timerId?: NodeJS.Timeout;

  //this start the timer
  startTimer = () => {
    this.setState({ time: new Date().toLocaleTimeString() });
    this.timerId = setInterval(() => {
      this.setState({ time: new Date().toLocaleTimeString() });
    }, 1000);
  }

  //this stop the timer when reload
  stopTimer = () =>{
    if (this.timerId) clearInterval(this.timerId);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer(); 
  }

  render() {
    return (
      <>
        <p className="font-bold text-gray-700 text-[20px]">{this.state.time}</p>
      </>
    );
  }
}

export default Clock;
