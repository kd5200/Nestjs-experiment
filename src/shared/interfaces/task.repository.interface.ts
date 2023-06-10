import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

import { Task } from '../../tasks/task.entity';

export interface TaskRepositoryInterface
  extends BaseInterfaceRepository<Task> {}
