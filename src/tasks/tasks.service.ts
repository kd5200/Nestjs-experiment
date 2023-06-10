import { Task } from './task.entity';
import { Injectable, Inject } from '@nestjs/common';
import { TaskStatus } from './tasks.status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from '../shared/repositories/task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
export interface DeleteReponse {
  id: string;
  message: string;
}
@Injectable()
export class TasksService {
  constructor(
    private taskRepo: TaskRepository,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return await this.taskRepo.getTasks(filterDto );
  }


  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepo.findOne({
      where: {id: id},
    });
    if (!found) {
      throw new Error('Task not found');
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.taskRepo.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.taskRepo.save(task);
    return task;
  }

  async deleteTask(id: any): Promise<DeleteReponse> {
    const result = await this.taskRepo.delete({
      id: id,
    });

    console.log(result);
    return { id, message: 'Task Successfully Removed' };
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.taskRepo.save(task);

    return task;
  }
}
