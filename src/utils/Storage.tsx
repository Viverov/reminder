import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Storage {
  private tasks: string[] = [];
  private exitFromHomeDate: Date | null = null;

  public async loadStorage(): Promise<boolean> {
    const tasksItem = await AsyncStorage.getItem(StorageKeys.Tasks);
    if (tasksItem != null) {
      this.tasks = JSON.parse(tasksItem);
    }

    const exitFromHomeDate = await AsyncStorage.getItem(StorageKeys.ExitFromHomeDate);
    if (exitFromHomeDate !== null) {
      this.exitFromHomeDate = new Date(exitFromHomeDate);
    }

    return true;
  }

  public getTasks(): string[] {
    return this.tasks;
  }

  public async setTasks(tasks: string[]): Promise<void> {
    this.tasks = tasks;
    await AsyncStorage.setItem(StorageKeys.Tasks, JSON.stringify(tasks));
  }

  public getExitFromHomeDate(): Date | null {
    return this.exitFromHomeDate || null;
  }

  public async setExitFromHomeDate(date: Date): Promise<void> {
    if (Number.isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    this.exitFromHomeDate = date;
    await AsyncStorage.setItem(StorageKeys.ExitFromHomeDate, date.toString());
  }

  public async clearExitFromHomeDate(): Promise<void> {
    await AsyncStorage.removeItem(StorageKeys.ExitFromHomeDate);
  }
}

enum StorageKeys {
  Tasks = 'Tasks',
  ExitFromHomeDate = 'ExitFromHomeDate',
}
