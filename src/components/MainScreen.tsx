import React, { Component } from 'react';
import { Text, View } from 'react-native';
import AlarmScreen from './AlarmScreen';
import AtHomeScreen from './AtHomeScreen';
import Storage from '../utils/Storage';
import PrepareToGoScreen from './PrepareToGoScreen';
import ReadyToGoScreen from './ReadyToGoScreen';
import config from '../../config';

type MainScreenProps = {
  storage: Storage
}

type MainScreenState = {
  currentStatus: Status
}

export default class MainScreen extends Component<MainScreenProps, MainScreenState> {
  public constructor(props: MainScreenProps) {
    super(props);
    this.state = {
      currentStatus: this.resolveStatus(),
    };
  }

  public render(): JSX.Element {
    return (
      <View style={{
        height: '100%',
        width: '100%',
      }}
      >
        { this.resolveScreen() }
      </View>
    );
  }

  private resolveScreen(): JSX.Element {
    switch (this.state.currentStatus) {
      case Status.AT_HOME: {
        return <AtHomeScreen startPrepareCallback={() => { this.changeCurrentStatus(Status.PREPARE_TO_GO); }} />;
      }
      case Status.PREPARE_TO_GO: {
        return (
          <PrepareToGoScreen
            confirmTasksCallback={() => this.changeCurrentStatus(Status.READY_TO_GO)}
            storage={this.props.storage}
          />
        );
      }
      case Status.READY_TO_GO: {
        return (
          <ReadyToGoScreen
            storage={this.props.storage}
            onAtHomeCallback={() => { this.changeCurrentStatus(Status.AT_HOME); }}
          />
        );
      }
      case Status.ALARM: {
        return <AlarmScreen onDismissCallback={() => this.changeCurrentStatus(Status.PREPARE_TO_GO)} />;
      }
      default: return (
        <Text>
          Invalid state:
          {this.state.currentStatus}
        </Text>
      );
    }
  }

  private changeCurrentStatus(newStatus: Status): void {
    this.setState(prevState => ({ ...prevState, currentStatus: newStatus }));
  }

  private resolveStatus(): Status {
    const exitFromHomeDate = this.props.storage.getExitFromHomeDate();
    if (exitFromHomeDate === null) return Status.AT_HOME;
    if (new Date().getTime() - exitFromHomeDate.getTime() < config.defaultMsForWalk) {
      return Status.READY_TO_GO;
    }

    return Status.AT_HOME;
  }
}

enum Status {
  AT_HOME,
  PREPARE_TO_GO,
  READY_TO_GO,
  ALARM,
}
