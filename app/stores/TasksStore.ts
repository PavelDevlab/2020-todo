import { observable, action, computed } from 'mobx';

export interface TaskItemRequest {
  info: string,
  done: boolean
}

export type TaskItem = TaskItemRequest & {
  id: number
}

export class TasksStore {

  @observable tasks:TaskItem[] = [];

  @observable isDoneFilter:boolean|null = null;

  @observable lastId: number = 0;

  getIndexTaskById(targetId:number):number {
    return this.tasks.findIndex(c => c.id === targetId);
  }

  getNextId():number {
    this.lastId += 1;
    return this.lastId;
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

  private static instance:TasksStore|null = null;

  public static create():TasksStore {
    if (TasksStore.instance === null) {
      return new TasksStore();
    }
    return TasksStore.instance;
  }
}

export default TasksStore.create();
