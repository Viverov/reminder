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
      case Status.AtHome: {
        return <AtHomeScreen startPrepareCallback={() => { this.changeCurrentStatus(Status.PrepareToGo); }} />;
      }
      case Status.PrepareToGo: {
        return (
          <PrepareToGoScreen
            confirmTasksCallback={() => this.changeCurrentStatus(Status.ReadyToGo)}
            storage={this.props.storage}
          />
        );
      }
      case Status.ReadyToGo: {
        return (
          <ReadyToGoScreen
            storage={this.props.storage}
            onAtHomeCallback={() => { this.changeCurrentStatus(Status.AtHome); }}
          />
        );
      }
      case Status.Alarm: {
        return <AlarmScreen onDismissCallback={() => this.changeCurrentStatus(Status.PrepareToGo)} />;
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
    if (exitFromHomeDate === null) return Status.AtHome;
    if (new Date().getTime() - exitFromHomeDate.getTime() < config.defaultMsForWalk) {
      return Status.ReadyToGo;
    }

    return Status.AtHome;
  }
}

enum Status {
  AtHome,
  PrepareToGo,
  ReadyToGo,
  Alarm,
}
