import { Body, Controller, Get, Post, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common';
import { TasksService, DeleteReponse } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './tasks.status.enum';
import { updateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('v1/tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto, @GetUser() user: User): Promise<Task []> {
    return this.tasksService.getTasks(filterDto, user);
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    console.log('controller', id);
    return this.tasksService.getTaskById(id, user);
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<DeleteReponse> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTasksById(@Param('id') id: string, @Body() updateTaskStatusDto: updateTaskStatusDto, @GetUser() user: User): Promise<Task> {
    const { status } = updateTaskStatusDto
    return this.tasksService.updateTaskStatus(id, status, user);

  } 
}
