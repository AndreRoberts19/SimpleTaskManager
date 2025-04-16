import {Injectable, NotFoundException} from '@nestjs/common';
// import { CreateTaskDto } from './dto/create-task.dto';
// import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {

  private tasks: Task[] = [];

  create(title: string, description: string) {
    const task: Task = {
      id: uuid(),
      title,
      description,
      completed: false,
    };

    this.tasks.push(task);

    console.log("Added task", title, description);

    return task;
  }

  findAll() {
    console.log("Retrieving all tasks");
    console.log(this.tasks);
    return this.tasks;
  }

  findOne(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  update(id: string, title: string | null, description: string | null, completed: boolean | null) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    const updatedTask: Task = {
      id,
      title: title ?? this.tasks[index].title,
      description: description ?? this.tasks[index].description,
      completed: completed ?? this.tasks[index].completed
    };

    this.tasks[index] = updatedTask;

    console.log("Updated task", updatedTask.title, updatedTask.description);

    return updatedTask;

  }

  remove(id: string) {
    console.log("Removed task", id);
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
