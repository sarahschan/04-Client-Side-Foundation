import { Component, Input } from '@angular/core';
import { Task } from '../../models';

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  @Input()
  tasks: Task[] = []

  // Define priority order mapping
  private priorityOrder: Record<string, number> = {
    high: 1,
    medium: 2,
    low: 3
  };

  // Getter to return tasks sorted by dueDate (earliest first), then by priority (high → medium → low)
  get sortedTasks(): Task[] {
    return [...this.tasks].sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();

      if (dateA !== dateB) {
        return dateA - dateB; // Sort by earliest due date first
      }

      // If due dates are the same, sort by priority
      return this.priorityOrder[a.priority] - this.priorityOrder[b.priority];
    });
  }

}

// Sort by due date (earliest first)
// get sortedTasks(): Task[] {
//   return [...this.tasks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
// }
