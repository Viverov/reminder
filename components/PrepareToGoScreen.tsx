import React, {Component} from "react";
import {Button, ScrollView, Text, View} from "react-native";
import Storage from '../utils/Storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";
import colors from '../constants/colors'
import locale from '../constants/locale'
import {StyledText} from "./StyledText";
import {Task} from "./Task";

type PrepareToGoScreenProps = {
  storage: Storage,
  confirmTasksCallback: () => void
}

type PrepareToGoScreenState = {
  tasks: {id: string, name: string, isChecked: boolean}[]
}

export class PrepareToGoScreen extends Component<PrepareToGoScreenProps, PrepareToGoScreenState>{
  constructor(props: PrepareToGoScreenProps) {
    super(props);
    const tasks = this.props.storage.getTasks();
    this.state = {
      tasks: tasks.map(t => ({id: uuidv4(), name: t, isChecked: false}))
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
      <StyledText withMargins={true} text={locale.PREPARE_TO_GO}/>
      { this.renderTasks() }
      <Button title={locale.CREATE_NEW_TASK} onPress={() => { this.onNewTask() } } />
      <Button
        title={locale.CONFIRM_TASKS}
        onPress={() => { this.onConfirmAllTasks() }}
        disabled={ this.isAllTasksConfirmed() }
      />
    </View>
  }

  renderTasks(): JSX.Element {
    const renderedTasks = this.state.tasks.map<JSX.Element>(t =>
      <Task
        id={t.id}
        key={t.id}
        text={t.name}
        onDeleteCallback={(id) => {this.onDeleteTask(id)}}
        onEditCallback={(id, newText) => {this.onEditTask(id, newText)}}
        onCheckCallback={(id, isChecked) => {this.onCheckTask(id, isChecked)}}
      />
    )

    return <ScrollView style={{borderStyle: "solid", borderWidth: 5, height: 1}}>
      {renderedTasks}
    </ScrollView>
  }

  onDeleteTask(id: string) {
    const newTasks = this.state.tasks.filter(t => t.id !== id);
    this.setState({ ...this.state, tasks: newTasks });
    this.props.storage.setTasks(newTasks.map(t => t.name));
  }

  onEditTask(id: string, newName: string) {
    const newTasks = this.state.tasks.map(t => t.id === id ? {id: t.id, name: newName, isChecked: false} : t);
    this.setState({ ...this.state, tasks: newTasks });
    this.props.storage.setTasks(newTasks.map(t => t.name));
  }

  onCheckTask(id: string, isChecked: boolean) {
    const newTasks = this.state.tasks.map(t => t.id === id ? {id: t.id, name: t.name, isChecked } : t);
    this.setState({ ...this.state, tasks: newTasks });
  }

  onNewTask() {
    const newTasks = [ ...this.state.tasks, { id: uuidv4(), name: locale.DEFAULT_TASK_NAME, isChecked: false }]
    this.setState({ ...this.state, tasks: newTasks });
    this.props.storage.setTasks(newTasks.map(t => t.name));
  }

  onConfirmAllTasks() {
    this.props.storage.setExitFromHomeDate(new Date()).then(() => {
      this.props.confirmTasksCallback();
    });
  }

  isAllTasksConfirmed(): boolean {
    return this.state.tasks.some(t => !t.isChecked)
  }
}
