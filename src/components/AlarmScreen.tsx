import React, { Component } from 'react';
import { Button, View } from 'react-native';
import colors from '../constants/colors';
import locale from '../constants/locale';
import StyledText from './StyledText';

type AlarmProps = {
  onDismissCallback: () => void
}

export default class AlarmScreen extends Component<AlarmProps> {
  public render(): JSX.Element {
    return (
      <View style={{
        backgroundColor: colors.RED,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
      }}
      >
        <StyledText height="20%" color={colors.WHITE} isBold text={locale.ALARM} />
        <StyledText height="60%" color={colors.WHITE} text={locale.ALARM_TEXT} />
        <Button title={locale.ALARM_DISMISS} onPress={this.props.onDismissCallback} />
      </View>
    );
  }
}
