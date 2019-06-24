import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

const Countdown = (props) => {

    const [timer, setTimer] = useState('00:00');
    const [inter, setInter] = useState(null);

    useEffect(() => {

        const countDownDate = new Date().getTime() + props.time;

        if(inter) {
            clearInterval(inter);
            setInterval(null);
        }

        const interval = setInterval(() => {
            const now = new Date().getTime();

            console.log(now, countDownDate);

            const distance = countDownDate - now;

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimer((hours ? hours + ':' : '') + minutes + ':' + seconds);

            if(distance < 0) {
                clearInterval(interval);
                setTimer('time is up');
            }

        }, 1000);

        setInter(interval);

    }, [props.time]);

    return (
        <div className="countdown">
            <span>{timer}</span>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        time: state.time
    };
};

export default connect(mapStateToProps)(Countdown);