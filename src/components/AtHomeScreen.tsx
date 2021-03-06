import React, { Component } from 'react';
import { Button, View } from 'react-native';
import colors from '../constants/colors';
import locale from '../constants/locale';
import StyledText from './StyledText';

type AtHomeProps = {
  startPrepareCallback: () => void
}

export default class AtHomeScreen extends Component<AtHomeProps> {
  public render(): JSX.Element {
    return (
      <View style={{
        backgroundColor: colors.WHITE,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
      }}
      >
        <StyledText height="20%" withMargins text={locale.AT_HOME} />
        <StyledText height="60%" withMargins text={locale.AT_HOME_START_PREPARE} />
        <Button title={locale.AT_HOME_BUTTON} onPress={this.props.startPrepareCallback} />
      </View>
    );
  }
}
