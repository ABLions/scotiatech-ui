import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../interfaces/todo-interface';

@Pipe({
  name: 'filterByStatus'
})
export class FilterByStatusPipe implements PipeTransform {

  transform(tasks: Task[] | undefined, status: string): Task[] | undefined {
    return tasks?.filter(task => task.status === status);
  }

}
