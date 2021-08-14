import React, { Component } from 'react';
import {
  Button, CheckBox, TextInput, View,
} from 'react-native';
import colors from '../constants/colors';
import locale from '../constants/locale';
import StyledText from './StyledText';
import font from '../constants/font';

type TaskProps = {
  id: string
  onDeleteCallback: (id: string) => void
  onEditCallback: (id: string, newText:string) => void
  onCheckCallback: (id: string, isChecked: boolean) => void
  text: string
}

type TaskState = {
  editedNow: boolean,
  oldText: string,
  text: string,
  isChecked: boolean
}

export default class Task extends Component<TaskProps, TaskState> {
  public constructor(props: TaskProps) {
    super(props);
    this.state = {
      editedNow: false,
      oldText: props.text,
      text: props.text,
      isChecked: false,
    };
  }

  public render(): JSX.Element {
    return (
      <View style={{
        backgroundColor: colors.WHITE,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
      }}
      >
        <CheckBox value={this.state.isChecked} onValueChange={isChecked => { this.onCheck(isChecked); }} />
        { this.renderTextField() }
        { this.renderButtons() }
      </View>
    );
  }

  private renderTextField(): JSX.Element {
    if (this.state.editedNow) {
      return (
        <TextInput
          style={{
            flex: 1,
            fontSize: font.DEFAULT_FONT_SIZE,
          }}
          placeholder={locale.TASK_PLACEHOLDER}
          defaultValue={this.state.text}
          onChangeText={newText => this.setState(s => ({ ...s, text: newText }))}
        />
      );
    }

    return (
      <StyledText
        flex={1}
        text={this.state.text}
      />
    );
  }

  private renderButtons(): JSX.Element {
    if (this.state.editedNow) {
      return (
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Button title="✓" onPress={() => this.onTextChangeConfirm()} />
          <Button title="✗" color={colors.RED} onPress={() => this.onTextChangeCancel()} />
        </View>
      );
    }

    return (
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Button title="✎" onPress={() => this.onEditText()} />
        <Button title="🗑" color={colors.RED} onPress={() => this.onDelete()} />
      </View>
    );
  }

  private onTextChangeConfirm(): void {
    this.setState(s => ({ ...s, oldText: s.text, editedNow: false }));
    this.props.onEditCallback(this.props.id, this.state.text);
  }

  private onTextChangeCancel(): void {
    this.setState(s => ({ ...s, text: s.oldText, editedNow: false }));
  }

  private onEditText(): void {
    this.setState(s => ({ ...s, editedNow: true }));
  }

  private onDelete(): void {
    this.props.onDeleteCallback(this.props.id);
  }

  private onCheck(isChecked: boolean): void {
    this.setState(s => ({ ...s, isChecked }));
    this.props.onCheckCallback(this.props.id, isChecked);
  }
}
