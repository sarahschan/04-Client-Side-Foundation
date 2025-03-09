import { Injectable } from "@angular/core"
import { City } from "../../model/city"
import { ComponentStore } from "@ngrx/component-store";
import { from, Observable, switchMap, tap } from "rxjs";
import { liveQuery } from "dexie";
import { db } from "../app.db";

export interface CityState {
    cities: City[]
    loading: boolean
}

@Injectable({
    providedIn: 'root'
})
export class CityStore extends ComponentStore<CityState>{

    constructor() {                                                                 //  initial state - initializes the store with
        super({ cities: [], loading: false })                                       //      - cities: []        (empty list of cities)
    }                                                                               //      - loading: false    (not loading initially)


    // selector                                                                     //  selectors (Observables)
    readonly cities$ = this.select(state => state.cities)                           //      these expose Observables 
    readonly loading$ = this.select(state => state.loading)                         //      so components can subscribe and react to changes


    // updaters                                                                     //  updaters (State Modifiers)
    readonly setLoading = this.updater((state, loading: boolean) => ({              //      Updates ONLY the loading state
        ...state, loading                                                           //      ...state ensures that other properties (like cities) remain unchanged
    }));

    readonly setCities = this.updater<City[]>((state, cities: City[]) => ({         //      Updates the cities state with a new list of cities
        ...state, cities 
    }));


    // effects
    readonly loadCities = this.effect((trigger$: Observable<void>) =>               //  
        trigger$.pipe(
            tap(() => this.setLoading(true)),
            switchMap(() =>
                from(liveQuery(() => db.cities.reverse().toArray())).pipe(
                    tap({
                        next: (cities) => this.setCities(cities),
                        error: (error) => this.setLoading(false)
                    })
                )
            )
        )
    )


    //add new city
    readonly addNewCity = this.effect((city$: Observable<City>) =>
        city$.pipe(
            switchMap((city) =>
                from(db.addCity(city)).pipe(
                    tap(() => this.loadCities())
                )
            )
        )
    )

}