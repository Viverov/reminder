import React, {Component} from "react";
import {Button, ScrollView, Text, View} from "react-native";
import Storage from '../utils/Storage';
import 'react-native-get-random-values';
import colors from '../constants/colors'
import locale from '../constants/locale'
import {StyledText} from "./StyledText";
import config from "../config";

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const MS_PER_HOUR = 60 * 60 * 1000;
const MS_PER_MINUTE = 60 * 1000;
const MS_PER_SECOND = 1000;

type ReadyToGoScreenProps = {
  storage: Storage,
  onAtHomeCallback: () => void
}

type ReadyToGoScreenState = {
  exitFromHomeDate: Date | null
  updateStatusCheckIntervalId: NodeJS.Timer | null
  timer: TimerDate,
}

type TimerDate = {
  hours: number,
  minutes: number,
  seconds: number,
}

export class ReadyToGoScreen extends Component<ReadyToGoScreenProps, ReadyToGoScreenState>{
  constructor(props: ReadyToGoScreenProps) {
    super(props);
    this.state = {
      exitFromHomeDate: props.storage.getExitFromHomeDate(),
      updateStatusCheckIntervalId: null,
      timer: ReadyToGoScreen.convertMsIntoHoursAndMinutes(config.defaultMsForWalk),
    }
  }

  componentDidMount() {
    const intervalId = setInterval(() => {this.shouldChangeStatus()}, 300);
    this.setState({ ...this.state, updateStatusCheckIntervalId: intervalId })
  }

  componentWillUnmount() {
    if (this.state.updateStatusCheckIntervalId) {
      // @Dirtyhack: typescript know clearInterval, as  <Timeout> | <string> | <number>, but not NodeJS.Timer
      clearInterval(this.state.updateStatusCheckIntervalId as unknown as number)
    }
  }

  render(): JSX.Element {
    return <View style={{
      backgroundColor: colors.WHITE,
      display: "flex",
      flexDirection: "column",
      height: '100%',
      justifyContent: "space-between",
    }}>
      <StyledText withMargins={true} text={locale.READY_TO_GO}/>
      <StyledText withMargins={true} text={locale.TIMER}/>
      { this.renderTimer() }
      <Button title={locale.ALREADY_AT_HOME} onPress={() => {this.onAlreadyAtHomePress()}}/>
    </View>
  }

  renderTimer(): JSX.Element {
    return <StyledText text={`${this.state.timer.hours}:${this.state.timer.minutes.toString().padStart(2, '0')}:${this.state.timer.seconds.toString().padStart(2, '0')}`}/>
  }

  calculateTime(): TimerDate {
    if (!this.state.exitFromHomeDate) return { hours: 0, minutes: 0, seconds: 0 };
    const now = new Date();
    const diffMs = now.getTime() - this.state.exitFromHomeDate.getTime()
    const remainingTime = config.defaultMsForWalk - diffMs;
    if (remainingTime <= 0) return { hours: 0, minutes: 0, seconds: 0 };
    return ReadyToGoScreen.convertMsIntoHoursAndMinutes(remainingTime)
  }

  shouldChangeStatus() {
    this.setState({...this.state, timer: this.calculateTime()})

    if (
      !this.state.exitFromHomeDate ||
      (new Date().getTime() - this.state.exitFromHomeDate.getTime() > config.defaultMsForWalk)
    ) {
      this.props.storage.clearExitFromHomeDate().then(() => {
        this.props.onAtHomeCallback();
      });
    }
  }

  private onAlreadyAtHomePress() {
    this.props.storage.clearExitFromHomeDate().then(() => {
      this.props.onAtHomeCallback();
    });
  }

  private static convertMsIntoHoursAndMinutes(ms: number): TimerDate {
    const hours = Math.floor((ms % MS_PER_DAY) / MS_PER_HOUR);
    const minutes = Math.floor(((ms % MS_PER_DAY) % MS_PER_HOUR) / MS_PER_MINUTE);
    const seconds = Math.floor((((ms % MS_PER_DAY) % MS_PER_HOUR) % MS_PER_MINUTE) / MS_PER_SECOND);

    return {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }
}
