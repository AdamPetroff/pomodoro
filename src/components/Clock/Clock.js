import React, {useState, useEffect} from 'react';
import './Clock.css';

const Clock = (props) => {

    const [dragging, setDragging] = useState(false);
    const [origin, setOrigin] = useState({
        x: null,
        y: null
    });

    const [handle, setHandle] = useState({
        x: null,
        y: null
    });

    const [lastAngle, setLastAngle] = useState(0);
    const [draggableEl, setDraggableEl] = useState(null);


    const clickHourHand = (event) => {
        event.preventDefault();
        event.stopPropagation();

        setHandle({
            x: event.pageX,
            y: event.pageY
        });

        setDragging(true);

        console.log(dragging, 'click');

        setOrigin({
            x: draggableEl.offsetLeft,
            y: draggableEl.offsetTop
        });
    };

    const letUpHourHand = (event) => {
        if(dragging) {
            setDragging(false);

            const startRotationPointX = event.pageX;
            const startRotationPointY = event.pageY;

            let startRad = Math.atan2(startRotationPointY - origin.y, startRotationPointX - origin.x); // current to origin
            startRad -= Math.atan2(handle.y - origin.y, handle.x - origin.x); // handle to origin

            setLastAngle(lastAngle + startRad);
        }
    };

    const dragHourHand = (event) => {
        console.log(dragging);
        if(dragging) {

            const startRotationPointX = event.pageX;
            const startRotationPointY = event.pageY;

            if (startRotationPointX !== origin.x && startRotationPointY !== origin.y) {
                let startRad = Math.atan2(startRotationPointY - origin.y, startRotationPointX - origin.x); // current to origin
                startRad -= Math.atan2(handle.y - origin.y, handle.x - origin.x); // handle to origin
                startRad += lastAngle; // relative to the last one
                const degree = (startRad * (360 / (2 * Math.PI)));

                draggableEl.style.transform = 'translateX(-50%) rotate(' + degree + 'deg)';
            }
        }
    };

    useEffect(() => {
        setDraggableEl(document.getElementById('hour-hand'));
    }, []);

    return (
        <div onMouseUp={letUpHourHand} onMouseMove={dragHourHand} className="clock">
            <div className="clock__dial">
                <span className="clock__dial-number clock__dial-number--0">0</span>
                <span className="clock__dial-number clock__dial-number--15">15</span>
                <span className="clock__dial-number clock__dial-number--30">30</span>
                <span className="clock__dial-number clock__dial-number--45">45</span>
            </div>

            <div id="hour-hand" className="clock__hour-hand">
                <div onMouseDown={clickHourHand} className="clock__hour-hand-handle"/>
            </div>
            <div className="clock__background"/>
        </div>
    );
};

// $(function () {
//     var dragging = false,
//         target_wp,
//         o_x, o_y, h_x, h_y, last_angle;
//     $('.handle').mousedown(function (e) {
//         h_x = e.pageX;
//         h_y = e.pageY; // clicked point
//         e.preventDefault();
//         e.stopPropagation();
//         dragging = true;
//         target_wp = $(e.target).closest('.draggable_wp');
//         if (!target_wp.data("origin")) target_wp.data("origin", {
//             left: target_wp.offset().left,
//             top: target_wp.offset().top
//         });
//         o_x = target_wp.data("origin").left;
//         o_y = target_wp.data("origin").top; // origin point
//
//         last_angle = target_wp.data("last_angle") || 0;
//     })
//
//     $(document).mousemove(function (e) {
//         if (dragging) {
//             var s_x = e.pageX,
//                 s_y = e.pageY; // start rotate point
//             if (s_x !== o_x && s_y !== o_y) { //start rotate
//                 var s_rad = Math.atan2(s_y - o_y, s_x - o_x); // current to origin
//                 s_rad -= Math.atan2(h_y - o_y, h_x - o_x); // handle to origin
//                 s_rad += last_angle; // relative to the last one
//                 var degree = (s_rad * (360 / (2 * Math.PI)));
//                 target_wp.css('-moz-transform', 'rotate(' + degree + 'deg)');
//                 target_wp.css('-moz-transform-origin', '50% 50%');
//                 target_wp.css('-webkit-transform', 'rotate(' + degree + 'deg)');
//                 target_wp.css('-webkit-transform-origin', '50% 50%');
//                 target_wp.css('-o-transform', 'rotate(' + degree + 'deg)');
//                 target_wp.css('-o-transform-origin', '50% 50%');
//                 target_wp.css('-ms-transform', 'rotate(' + degree + 'deg)');
//                 target_wp.css('-ms-transform-origin', '50% 50%');
//             }
//         }
//     }) // end mousemove
//
//     $(document).mouseup(function (e) {
//         dragging = false
//         var s_x = e.pageX,
//             s_y = e.pageY;
//
//         // Saves the last angle for future iterations
//         var s_rad = Math.atan2(s_y - o_y, s_x - o_x); // current to origin
//         s_rad -= Math.atan2(h_y - o_y, h_x - o_x); // handle to origin
//         s_rad += last_angle;
//         target_wp.data("last_angle", s_rad);
//     })
// })

(function() {
    var init, rotate, start, stop,
        active = false,
        angle = 0,
        rotation = 0,
        startAngle = 0,
        center = {
            x: 0,
            y: 0
        },
        R2D = 180 / Math.PI,
        rot = document.getElementById('rotate');

    init = function() {
        rot.addEventListener("mousedown", start, false);
        $(document).bind('mousemove', function(event) {
            if (active === true) {
                event.preventDefault();
                rotate(event);
            }
        });
        $(document).bind('mouseup', function(event) {
            event.preventDefault();
            stop(event);
        });
    };

    start = function(e) {
        e.preventDefault();
        var bb = this.getBoundingClientRect(),
            t = bb.top,
            l = bb.left,
            h = bb.height,
            w = bb.width,
            x, y;
        center = {
            x: l + (w / 2),
            y: t + (h / 2)
        };
        x = e.clientX - center.x;
        y = e.clientY - center.y;
        startAngle = R2D * Math.atan2(y, x);
        return active = true;
    };

    rotate = function(e) {
        e.preventDefault();
        var x = e.clientX - center.x,
            y = e.clientY - center.y,
            d = R2D * Math.atan2(y, x);
        rotation = d - startAngle;
        return rot.style.webkitTransform = "rotate(" + (angle + rotation) + "deg)";
    };

    stop = function() {
        angle += rotation;
        return active = false;
    };

    init();

}).call(this);

export default Clock;