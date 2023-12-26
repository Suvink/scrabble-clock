import React from 'react';
import PropTypes from 'prop-types';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    AppState
} from 'react-native';
import _ from 'lodash';
import { sprintf } from 'sprintf-js';

const DEFAULT_DIGIT_STYLE = { backgroundColor: '#FAB913' };
const DEFAULT_DIGIT_TXT_STYLE = { color: '#000' };
const DEFAULT_TIME_LABEL_STYLE = { color: '#000' };
const DEFAULT_SEPARATOR_STYLE = { color: '#000' };
const DEFAULT_TIME_TO_SHOW = ['D', 'H', 'M', 'S'];
const DEFAULT_TIME_LABELS = {
    d: 'Days',
    h: 'Hours',
    m: 'Minutes',
    s: 'Seconds',
};

class CountDown extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        digitStyle: PropTypes.object,
        digitTxtStyle: PropTypes.object,
        timeLabelStyle: PropTypes.object,
        separatorStyle: PropTypes.object,
        timeToShow: PropTypes.array,
        showSeparator: PropTypes.bool,
        isGameStarted: PropTypes.bool,
        size: PropTypes.number,
        until: PropTypes.number,
        onChange: PropTypes.func,
        onPress: PropTypes.func,
        onFinish: PropTypes.func,
        onAppBackground: PropTypes.func
    };

    state = {
        until: Math.max(this.props.until, 0),
        lastUntil: null,
        wentBackgroundAt: null,
        eventListener: null,
        isReverse: false
    };

    constructor(props) {
        super(props);
        this.timer = setInterval(this.updateTimer, 1000);
    }

    componentDidMount() {
        this.state.eventListener = AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.state.eventListener.remove();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.until !== prevProps.until || this.props.id !== prevProps.id) {
            this.setState({
                lastUntil: prevState.until,
                until: Math.max(prevProps.until, 0),
                isReverse: false
            });
        }
    }
    // componentWillReceiveProps(nextProps) {
    //   if (this.props.until !== nextProps.until || this.props.id !== nextProps.id) {
    //     this.setState({
    //       lastUntil: this.state.until,
    //       until: Math.max(nextProps.until, 0)
    //     });
    //   }
    // }

    _handleAppStateChange = currentAppState => {
        const { until, wentBackgroundAt } = this.state;
        if (currentAppState === 'active' && wentBackgroundAt && this.props.running) { //User comes from the background
            if (this.props.onAppBackground !== undefined) {
                this.props.onAppBackground("resume");
            }
            else {
                //If the user does not have provided a background function, let the timer run by default
                const diff = (Date.now() - wentBackgroundAt) / 1000.0;
                this.setState({
                    lastUntil: until,
                    until: Math.max(0, until - diff)
                });
            }
        }
        if (currentAppState === 'background') { //user went background
            this.setState({ wentBackgroundAt: Date.now() });
            if (this.props.onAppBackground !== undefined) {
                this.props.onAppBackground("pause");
            }
        }
    }

    getTimeLeft = () => {
        const { until } = this.state;
        return {
            seconds: until % 60,
            minutes: parseInt(until / 60, 10) % 60,
            hours: parseInt(until / (60 * 60), 10) % 24,
            days: parseInt(until / (60 * 60 * 24), 10),
        };
    };

    updateTimer = () => {
        if (!this.state.isReverse) {
            if (!this.props.running) return;
            if (this.state.isGameStarted && (this.state.lastUntil === this.state.until)) return;

            if (this.state.until === 1 || (this.state.until === 0 && this.state.lastUntil !== 1)) {
                if (this.props.onFinish) {
                    this.setState({ isReverse: true });
                    this.props.onFinish();
                }
                if (this.props.onChange) {
                    this.props.onChange(this.state.until);
                }
            }

            if (this.state.until === 0) {
                this.setState({ lastUntil: 0, until: 0 });
            } else {
                if (this.props.onChange) {
                    this.props.onChange(this.state.until - 1);
                }
                this.setState({
                    lastUntil: this.state.until,
                    until: Math.max(0, this.state.until - 1)
                });
            }
        } else {
            this.updatePenaltyTimer();
        }


    };

    updatePenaltyTimer = () => {
        //Count up
        if (!this.props.running) {
            return;
        }

        if (this.state.until === 1 && !this.state.isReverse) {
            if (this.props.onChange) {
                this.props.onChange(0);
            }
            this.setState({
                lastUntil: 0,
                until: 0
            });
        } else {
            this.setState({
                lastUntil: this.state.until,
                until: Math.max(0, this.state.until + 1)
            });
            if (this.props.onChange) {
                this.props.onChange(this.state.until);
            }
        }

    };

    renderDigit = (d) => {
        const { digitStyle, digitTxtStyle, size } = this.props;
        return (
            <View style={[
                styles.digitCont,
                { width: size * 2.1, height: size * 2.6 },
                digitStyle,
            ]}>
                {
                    this.state.isReverse ?
                        <Text style={[
                            styles.digitTxt,
                            { fontSize: 100 },
                            digitTxtStyle,
                        ]}>
                            {d}
                        </Text> :
                        <Text style={[
                            styles.digitTxt,
                            { fontSize: size },
                            digitTxtStyle,
                        ]}>
                            {d}
                        </Text>
                }
            </View>
        );
    };

    renderLabel = label => {
        const { timeLabelStyle, size } = this.props;
        if (label) {
            return (
                <Text style={[
                    styles.timeTxt,
                    { fontSize: size / 1.8 },
                    timeLabelStyle,
                ]}>
                    {label}
                </Text>
            );
        }
    };

    renderDoubleDigits = (label, digits) => {
        return (
            <View style={styles.doubleDigitCont}>
                <View style={styles.timeInnerCont}>
                    {this.renderDigit(digits)}
                </View>
                {this.renderLabel(label)}
            </View>
        );
    };

    renderSeparator = () => {
        const { separatorStyle, size } = this.props;
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[
                    styles.separatorTxt,
                    { fontSize: size * 1.2 },
                    separatorStyle,
                ]}>
                    {":"}
                </Text>
            </View>
        );
    };

    renderMinusSeparator = () => {
        const { separatorStyle, size } = this.props;
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[
                    styles.minusSeparatorTxt,
                    { fontSize: size },
                    separatorStyle,
                ]}>
                    {"-"}
                </Text>
            </View>
        );
    };

    renderCountDown = () => {
        const { timeToShow, timeLabels, showSeparator } = this.props;
        const { until } = this.state;
        const { days, hours, minutes, seconds } = this.getTimeLeft();
        const newTime = sprintf('%02d:%02d:%02d:%02d', days, hours, minutes, seconds).split(':');
        const Component = this.props.onPress ? TouchableOpacity : View;

        return (
            <Component
                style={styles.timeCont}
                onPress={this.props.onPress}
            >
                {/* {this.state.isReverse ? this.renderMinusSeparator() : null} */}
                {timeToShow.includes('H') ? this.renderDoubleDigits(timeLabels.h, newTime[1]) : null}
                {showSeparator && timeToShow.includes('H') && timeToShow.includes('M') ? this.renderSeparator() : null}
                {timeToShow.includes('M') ? this.renderDoubleDigits(timeLabels.m, newTime[2]) : null}
                {showSeparator && timeToShow.includes('M') && timeToShow.includes('S') ? this.renderSeparator() : null}
                {timeToShow.includes('S') ? this.renderDoubleDigits(timeLabels.s, newTime[3]) : null}
            </Component>
        );
    };

    render() {
        return (
            <View style={this.props.style}>
                {this.renderCountDown()}
            </View>
        );
    }
}

CountDown.defaultProps = {
    digitStyle: DEFAULT_DIGIT_STYLE,
    digitTxtStyle: DEFAULT_DIGIT_TXT_STYLE,
    timeLabelStyle: DEFAULT_TIME_LABEL_STYLE,
    timeLabels: DEFAULT_TIME_LABELS,
    separatorStyle: DEFAULT_SEPARATOR_STYLE,
    timeToShow: DEFAULT_TIME_TO_SHOW,
    showSeparator: false,
    until: 0,
    size: 15,
    running: true,
};

const styles = StyleSheet.create({
    timeCont: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    timeTxt: {
        color: 'white',
        marginVertical: 2,
        backgroundColor: 'transparent',
    },
    timeInnerCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    digitCont: {
        borderRadius: 5,
        marginHorizontal: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    doubleDigitCont: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    digitTxt: {
        color: 'white',
        fontWeight: 'bold',
        fontVariant: ['tabular-nums']
    },
    separatorTxt: {
        backgroundColor: 'transparent',
        fontWeight: 'bold',
        color: '#0c1d36',
    },
    minusSeparatorTxt: {
        backgroundColor: 'transparent',
        fontWeight: 'bold',
        color: '#0c1d36',
        marginLeft: 20,
        marginRight: 0
    },
});

export default CountDown;
export { CountDown };