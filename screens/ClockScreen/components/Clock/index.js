import React, { useState, useEffect } from 'react';
import CountDown from 'react-native-countdown-component';

const Clock = ({ time, running, id }) => {

    return (
        <CountDown
            until={time}
            onFinish={() => alert('finished')}
            timeToShow={['M', 'S']}
            size={80}
            digitStyle={{ backgroundColor: 'transparent' }}
            digitTxtStyle={{ color: '#222B45', fontSize: 120 }}
            timeLabels={{}}
            showSeparator={true}
            separatorStyle={{ padding: 0, margin: 0 }}
            running={running}
            id={id || 456}
        />
    )
}

export default Clock;