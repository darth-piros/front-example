import { Observable } from "rxjs";
import { MainState } from "@app/store/main.state";

export type SelectorFunction<T> = (source$: Observable<MainState>) => Observable<T>;
