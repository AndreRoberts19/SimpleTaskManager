import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
      @Body('title') title: string,
      @Body('description') description: string
  ) {
    return this.tasksService.create(title, description);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(
      @Param('id') id: string,
      @Body('title') title: string | null,
      @Body('description') description: string | null,
      @Body('completed') completed: boolean | null
  ) {
    return this.tasksService.update(id, title, description, completed);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
