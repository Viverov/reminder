import React, {Component} from "react";
import {Button, Text, View} from "react-native";
import {AlarmScreen} from "./AlarmScreen";
import {AtHomeScreen} from "./AtHomeScreen";
import Storage from "../utils/Storage";
import {PrepareToGoScreen} from "./PrepareToGoScreen";
import {ReadyToGoScreen} from "./ReadyToGoScreen";
import config from "../config";

type MainScreenProps = {
  storage: Storage
}

type MainScreenState = {
  currentStatus: STATUS
}

export class MainScreen extends Component<MainScreenProps, MainScreenState>{
  constructor(props: MainScreenProps) {
    super(props)
    this.state = {
      currentStatus: this.resolveStatus(),
    }
  }

  render() {
    return <View style={{
      height: '100%',
      width: '100%',
    }}>
      { this.resolveScreen() }
    </View>
  }

  resolveScreen(): JSX.Element {
    switch (this.state.currentStatus) {
      case STATUS.AT_HOME: return <AtHomeScreen startPrepareCallback={() => { this.changeCurrentStatus(STATUS.PREPARE_TO_GO) } }/>;
      case STATUS.PREPARE_TO_GO: return <PrepareToGoScreen confirmTasksCallback={() => this.changeCurrentStatus(STATUS.READY_TO_GO)} storage={this.props.storage}/>;
      case STATUS.READY_TO_GO: return <ReadyToGoScreen storage={this.props.storage} onAtHomeCallback={() => { this.changeCurrentStatus(STATUS.AT_HOME) }}/>;
      case STATUS.ALARM: return <AlarmScreen onDismissCallback={() => this.changeCurrentStatus(STATUS.PREPARE_TO_GO)}/>;
      default: return <Text>Invalid state: {this.state.currentStatus}</Text>
    }
  }

  changeCurrentStatus(newStatus: STATUS) {
    this.setState({ ...this.state, currentStatus: newStatus });
  }

  resolveStatus(): STATUS {
    const exitFromHomeDate = this.props.storage.getExitFromHomeDate();
    if (exitFromHomeDate === null) return STATUS.AT_HOME;
    if (new Date().getTime() - exitFromHomeDate.getTime() < config.defaultMsForWalk) return STATUS.READY_TO_GO;

    return STATUS.AT_HOME;
  }
}

enum STATUS {
  AT_HOME,
  PREPARE_TO_GO,
  READY_TO_GO,
  ALARM,
}
