import React, { Component } from 'react';
import { Text } from 'react-native';
import colors from '../constants/colors';
import font from '../constants/font';

type StyledTextProps = {
  text: string,
  height?: string,
  isBold?: boolean | undefined,
  color?: string,
  flex?: number | undefined,
  withMargins?: boolean | undefined,
}

export default class StyledText extends Component<StyledTextProps> {
  public render(): JSX.Element {
    return (
      <Text style={{
        color: this.props.color ? this.props.color : colors.BLACK,
        height: this.props.height,
        fontWeight: this.props.isBold ? 'bold' : 'normal',
        textAlign: 'center',
        marginLeft: this.props.withMargins ? '5%' : 0,
        marginTop: this.props.withMargins ? '5%' : 0,
        marginRight: this.props.withMargins ? '5%' : 0,
        fontSize: font.DEFAULT_FONT_SIZE,
        flex: this.props.flex,
      }}
      >
        {this.props.text}
      </Text>
    );
  }
}
