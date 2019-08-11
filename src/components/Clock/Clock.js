import React, {useEffect, useState} from 'react';
import './Clock.css';
import {connect} from "react-redux";
import {finishPomodoroAction, startPomodoroAction} from "../../store/actions/actionTypes";
import useInterval from "../../hooks/useInterval";

const Clock = ({ dispatch, pomodoroTime, pomodoroRunning, nextPomodoroPending }) => {
  const R2D = 180 / Math.PI;

  const [dragStartAngle, setDragStartAngle] = useState(0);
  const [active, setActive] = useState(false);
  const [angle, setAngle] = useState(0);

  const [minuteHandData, setMinuteHandData] = useState({
    el: null,
    center: {
      x: null,
      y: null
    },
    rotation: 0
  });

  const [secondHandData, setSecondHandData] = useState({
    el: null,
    center: {
      x: null,
      y: null
    },
    rotation: 0
  });

  const [time, setTime] = useState({
    minutes: 0,
    seconds: 0,
  });

  const timeToMinutes = (time) => {
    return time / 1000 / 60;
  };

  const minutesToTime = (minutes) => {
    return minutes * 60 * 1000;
  };

  const clickHourHand = (event) => {
    event.preventDefault();

    const x = event.clientX - minuteHandData.center.x;
    const y = event.clientY - minuteHandData.center.y;
    setDragStartAngle(R2D * Math.atan2(y, x));
    setActive(true);
  };

  const letUpHourHand = (event) => {
    event.preventDefault();

    if(angle + minuteHandData.rotation > 270) {
      setAngle(minuteHandData.rotation - 360);
    } else {
      setAngle(minuteHandData.rotation);
    }

    setActive(false);

    dispatch(startPomodoroAction(minutesToTime(time.minutes)));
  };

  const dragMinuteHand = (event) => {
    event.preventDefault();
    if (active) {
      const x = event.clientX - minuteHandData.center.x;
      const y = event.clientY - minuteHandData.center.y;
      const d = R2D * Math.atan2(y, x);

      let rot = d - dragStartAngle;
      rot = Math.round(rot);

      let rot2 = rot;
      if ((angle + rot) < 0) {
        rot2 += 360;
      }

      if(angle + rot > 360){}

      console.log({angle, rot}, angle+rot);

      const oneMinute = 360 / 60;
      const min = Math.floor((rot + angle) / oneMinute);
      const min2 = Math.floor((rot2 + angle) / oneMinute);

      setMinuteHandData({
        ...minuteHandData,
        rotation: min * oneMinute,
      });

      setTime({
        minutes: min2,
        seconds: 0,
      });
    }
  };

  useEffect(() => {
    const minuteHandElement = document.getElementById('minute-hand');
    const secondHandElement = document.getElementById('second-hand');
    const minuteHandBoundingBox = minuteHandElement.getBoundingClientRect();
    const secondHandBoundingBox = minuteHandElement.getBoundingClientRect();

    setMinuteHandData({
      center: {
        x: minuteHandBoundingBox.left + (minuteHandBoundingBox.width / 2),
        y: minuteHandBoundingBox.top + (minuteHandBoundingBox.height / 2),
      },
      el: minuteHandElement,
      rotation: 0,
    });

    setSecondHandData({
      center: {
        x: secondHandBoundingBox.left + (secondHandBoundingBox.width / 2),
        y: secondHandBoundingBox.top + (secondHandBoundingBox.height / 2)
      },
      el: secondHandElement,
      rotation: 0,
    });

  }, []);

  useInterval(() => {
    if(pomodoroRunning && !active) {

      let newSeconds = time.seconds - 1;
      if (time.seconds === 0) {
        if (time.minutes === 0) {
          dispatch(finishPomodoroAction());

          setTime({
            seconds: 0,
            minutes: 0,
          });

          return;
        }

        setTime({
          seconds: 59,
          minutes: time.minutes - 1,
        });

        return;
      }

      setTime({
        seconds: newSeconds,
        minutes: time.minutes,
      });
    }
  }, pomodoroRunning ? 100 : null);

  useEffect(() => {
    if (minuteHandData.el && !active) {
      setMinuteHandData({
        ...minuteHandData,
        rotation: (time.minutes / 60) * 360
      });

      setSecondHandData({
        ...secondHandData,
        rotation: (time.seconds / 60) * 360
      })
    }


  }, [time, active]);

  useEffect(() => {
    if(!nextPomodoroPending) {
      setTime({
        minutes: timeToMinutes(pomodoroTime),
        seconds: 0,
      });
    }
  }, [pomodoroTime, nextPomodoroPending]);

  const formatTime = (time) => {
    let output = time.minutes < 10 ? "0" + time.minutes : time.minutes;
    output += ":";
    output += time.seconds < 10 ? "0" + time.seconds : time.seconds;

    return output;
  };

  // console.log({angle, startAngle, minuteHandData})

  return (
    <div onMouseUp={letUpHourHand} onMouseMove={dragMinuteHand} className="clock">
      <div className="clock__dial">
        <div className="clock__center">
          <div className="clock__display">
            <span>{formatTime(time)}</span>
          </div>
        </div>

        <span className="clock__dial-number clock__dial-number--0">0</span>
        <span className="clock__dial-number clock__dial-number--15">15</span>
        <span className="clock__dial-number clock__dial-number--30">30</span>
        <span className="clock__dial-number clock__dial-number--45">45</span>

        <div style={{transform: "translateX(-50%) rotate(" + minuteHandData.rotation + "deg)"}} onMouseDown={clickHourHand}
             id="minute-hand" className="clock__minute-hand">
          <div className="clock__minute-hand-tip"/>
        </div>

        <div style={{transform: "translateX(-50%) rotate(" + secondHandData.rotation + "deg)"}}
             id="second-hand"
             className="clock__second-hand"/>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    pomodoroTime: state.time,
    pomodoroRunning: state.pomodoroRunning,
    nextPomodoroPending: state.nextPomodoroPending,
  };
};

export default connect(mapStateToProps)(Clock);