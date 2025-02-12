/*
 * Copyright (c) 2023 Suvin Kodituwakku
 *
 * This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * You may share and adapt this work, but only for non-commercial purposes, and with proper attribution.
 *
 * License details: https://creativecommons.org/licenses/by-nc/4.0/
 */

import React from 'react';
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
    );
};

export default Clock;
