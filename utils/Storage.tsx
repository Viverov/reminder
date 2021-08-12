import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Storage {
  private tasks: string[] = [];
  private exitFromHomeDate: Date | null = null;

  public async loadStorage(): Promise<boolean> {
    const tasksItem = await AsyncStorage.getItem(STORAGE_KEYS.TASKS);
    if (tasksItem != null) {
      this.tasks = JSON.parse(tasksItem);
    }

    const exitFromHomeDate = await AsyncStorage.getItem(STORAGE_KEYS.EXIT_FROM_HOME_DATE);
    if (exitFromHomeDate !== null) {
      this.exitFromHomeDate = new Date(exitFromHomeDate);
    }

    return true
  }

  public getTasks(): string[] {
    return this.tasks
  }

  public async setTasks(tasks: string[]) {
    this.tasks = tasks;
    await AsyncStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }

  public getExitFromHomeDate(): Date | null {
    return this.exitFromHomeDate || null;
  }

  public async setExitFromHomeDate(date: Date) {
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    this.exitFromHomeDate = date;
    await AsyncStorage.setItem(STORAGE_KEYS.EXIT_FROM_HOME_DATE, date.toString());
  }

  public async clearExitFromHomeDate() {
    await AsyncStorage.removeItem(STORAGE_KEYS.EXIT_FROM_HOME_DATE);
  }
}

enum STORAGE_KEYS {
  TASKS = 'TASKS',
  EXIT_FROM_HOME_DATE = 'EXIT_FROM_HOME_DATE',
}
