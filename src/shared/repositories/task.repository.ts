import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Task } from '../../tasks/task.entity';
import { GetTasksFilterDto } from 'src/tasks/dto/get-tasks-filter.dto';

@Injectable()
export class TaskRepository extends Repository<Task>
  {
  constructor(@InjectRepository(Task)private readonly taskRepository: Repository<Task>) {
    super(Task, taskRepository.manager);
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { search, status } = filterDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', {status})
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` }
      )
    }

    const tasks = await query.getMany();
    return tasks; 
  }
}
