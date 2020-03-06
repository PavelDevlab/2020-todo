import { observable, action, computed, observe, IObjectDidChange } from 'mobx';

export interface TaskItemRequest {
  info: string,
  done: boolean
}

export type TaskItem = TaskItemRequest & {
  id: number
}

export class TasksStore {

  constructor() {
    this.loadDataFromStore();
  }

  @observable tasks:TaskItem[] = [];

  @observable isDoneFilter:boolean|null = null;

  @observable lastId = 0;

  getIndexTaskById(targetId:number):number {
    return this.tasks.findIndex(c => c.id === targetId);
  }

  getNextId():number {
    this.lastId += 1;
    return this.lastId;
  }

  updateLastId(id:number|string) {
    if (typeof id === 'string') {
      if (isFinite(parseInt(id, 10))) {
        id = parseInt(id, 10);
      } else {
        return;
      }
    }
    if (this.lastId < id) {
      this.lastId = id;
    }
  }

  @action clear():void {
    this.tasks = [];
    this.isDoneFilter = null;
    this.lastId = 0;
  }

  @action clearFilters():void {
    this.isDoneFilter = null;
  }

  @computed get filtedTasks():TaskItem[] {
    if (typeof this.isDoneFilter === 'boolean') {
      return this.tasks.filter(({done}) => {
        return done === this.isDoneFilter;
      });
    }
    return this.tasks;
  }

  @action setIsDone(isDone: boolean):void {
    this.isDoneFilter = isDone;
  }

  @action createTask(taskItem: TaskItemRequest):TaskItem {
    const newTask = {
      ...taskItem,
      id: this.getNextId(),
    };
    this.tasks.push(newTask);
    return newTask;
  }

  @action updateTask(taskItem: TaskItem):TaskItem {
    const index = this.getIndexTaskById(taskItem.id);
    if (index > -1) this.tasks[index] = taskItem;
    return taskItem;
  }

  @action deleteTask(deleteId: number):number|boolean {
    const index = this.getIndexTaskById(deleteId);
    if (index > -1) {
      this.tasks.splice(index, 1);
      return deleteId;
    }
    return false;
  }

  @action loadDataFromStore() {
    const lsKeyReg = new RegExp("^" + TasksStore.lsKeyPrefix);
    Object.entries(localStorage)
      .filter(([key]) => lsKeyReg.test(key))
      .map(([, item]) => {
        try {
          item = JSON.parse(item);
          return item;
        } catch (e) { return; }
      })
      .filter((item) => !!item)
      .sort((a,b) => {
        if (a.id > b.id) return 1;
        if (a.id < b.id) return -1;
        return 0;
      })
      .forEach((item:TaskItem) => {
        this.updateLastId(item.id);
        this.tasks.push(item);
      });
      // localStorage.getItem(lsKey)
  }

  private static instance:TasksStore|null = null;

  public static create():TasksStore {
    if (TasksStore.instance === null) {
      return new TasksStore();
    }
    return TasksStore.instance;
  }

  static lsKeyPrefix = 'task';

  static getLsKey(id:number) {
    return TasksStore.lsKeyPrefix + String(id);
  }
}

const store = TasksStore.create();

const applyToLocalStore = (newValue: TaskItem) => {
  try {
    localStorage.setItem(TasksStore.getLsKey(newValue.id), JSON.stringify(newValue));
  } catch (error) { return; }
};
const removeFromLocalStore = (newValue: TaskItem) => {
  try {
    localStorage.removeItem(TasksStore.getLsKey(newValue.id));
  } catch (error) { return; }
};

const handleObserve = (change: IObjectDidChange & {removed: any[], added: any[]}) => {
  if (change.type === "update") {
    applyToLocalStore(change.newValue);
  }
  if (change.removed?.length) {
    change.removed.forEach(removeFromLocalStore);
  }
  if (change.added?.length) {
    change.added.forEach(applyToLocalStore);
  }
};

observe(store.tasks, handleObserve as (change: IObjectDidChange) => void);

export default store;
