import { inject } from "@angular/core";
import { Task, TaskSlice } from "../models/task.model";
import { ComponentStore } from '@ngrx/component-store';
import { Observable, mergeMap, from, tap } from "rxjs";
import { v4 as uuidv4 } from 'uuid';
import { TaskDb } from "../shared/task.db";


const INIT: TaskSlice = {
    tasks: [],
    audit: [],
    priorityFilter: 'all'
}


export class TaskStore extends ComponentStore<TaskSlice> {

    taskDb = inject(TaskDb)
    constructor() {
        //init to empty array
        super(INIT)
    }


    // save task to dexie and also update the component store's in memory state IF save to dexie success
    readonly saveTask = this.effect(                                            // Method creates a saveTask. this.effect is a ComponentStore method that lets you handle side effects (like database operations)
        (task$: Observable<Task>) => task$.pipe(                                // Defines the function that processes the incoming task. task$ is an observable that will emit Task objects when saveTask is called. .pipe() allows for chaining RxJS operators to process stream of tasks
            mergeMap(newTask => {                                               // Takes each task that comes through the observable and transforms it. For each newTask that flows through, perform operations in the callback
                const taskWithId = {...newTask, id: uuidv4().substring(0, 8)}   // Create the new object - copy all properties from newTask and add id property

                // return from the database operation
                return from(this.taskDb.saveTask(taskWithId)).pipe (            // this.taskDb.saveTask() is a method that saves to Dexie, returning a promise. from() converts Promise into an Observable
                    tap({                                                       // tap to perform side effects without changing the data
                        next: (savedTask) => {                                  // Handle success cases
                            this.addTask(savedTask)                             // update in-memory state
                            console.log('Saved through dexie and added to component store')
                        },
                        error: (error) => {
                            console.error('Failed to save task to dexie: ', error)
                        }
                    })
                )
            })
        )
    )

    // mutator - updated methods
    // addTask(task) - add task to the store list
    readonly addTask = this.updater<Task>( (slice: TaskSlice, newTask: Task) => {
        return { 
            tasks: [...slice.tasks, newTask],
            audit: [...slice.audit,
                    `Task ${newTask.name} added. ${new Date().toLocaleString}`],
            priorityFilter: slice.priorityFilter
        } as TaskSlice
    }
    )


    // mutator for deleting a task
    readonly deleteTask = this.updater<string>( (slice: TaskSlice, taskId: string) => {
        return {
            tasks: slice.tasks.filter( (task: Task) => task.id !== taskId),
            audit: [...slice.audit, `Task ${taskId} deleted. ${new Date().toLocaleString}`],
            priorityFilter: slice.priorityFilter
        } as TaskSlice
    })


    // Selector query (without priority filter)
    // readonly getTasks$ = this.select<Task[]>( (slice: TaskSlice ) => {
    //     return slice.tasks.filter( (task: Task) => ( slice.priorityFilter === 'all' || task.priority === slice.priorityFilter ))
    // })


    // Selector query (with priority filter)
    readonly getTasks$ = (priority: string) => {
        return this.select<Task[]>
            ((slice: TaskSlice) => slice.tasks.filter(t => (priority === 'all') || (t.priority === priority)))
    }


    // Selector for count
    readonly getTaskCount$ = this.select<number>((slice: TaskSlice) => {
        return slice.tasks.length
    })

}