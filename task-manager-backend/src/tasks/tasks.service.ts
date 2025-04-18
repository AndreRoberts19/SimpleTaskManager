import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {

  constructor(
      @InjectRepository(Task)
      private tasksRepository: Repository<Task>,
  ) {}

  async create(title: string, description: string) {

    const task = {
      id: uuid(),
      title,
      description,
      completed: false,
    }

    await this.tasksRepository.insert(task);

    console.log("Added task", title, description);

    return task;
  }

  async findAll() {
    console.log("Retrieving all tasks");
    const tasks = await this.tasksRepository.find();
    console.log(tasks);
    return tasks;
  }

  findOne(id: string) {
    return this.tasksRepository.findOneBy({ id });
  }

  async update(id: string, title: string | null, description: string | null, completed: boolean | null) {

    const updateData: Partial<Task> = {};

    if (title !== null) {
      updateData.title = title;
    }
    if (description !== null) {
      updateData.description = description;
    }
    if (completed !== null) {
      updateData.completed = completed;
    }

    await this.tasksRepository.update(id, updateData);

    const task = await this.tasksRepository.findOne({ where: { id } });
    console.log("Updated task: ", task);

    return task;

  }

  async remove(id: string) {
    await this.tasksRepository.delete(id);
    console.log("Removed task", id);
  }
}
