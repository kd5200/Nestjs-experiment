import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Task } from '../../tasks/task.entity';
import { GetTasksFilterDto } from 'src/tasks/dto/get-tasks-filter.dto';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { User } from 'src/auth/user.entity';
import { TaskStatus } from 'src/tasks/tasks.status.enum';

@Injectable()
export class TaskRepository extends Repository<Task>
  {
  constructor(@InjectRepository(Task)private readonly taskRepository: Repository<Task>) {
    super(Task, taskRepository.manager);
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { search, status } = filterDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', {status})
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` }
      )
    }

    const tasks = await query.getMany();
    return tasks; 
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.save(task);
    return task;
  }
}
