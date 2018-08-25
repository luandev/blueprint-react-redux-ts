import * as EventViewStore from './movie';


// The top-level state object
export interface IApplicationState {
    movieStore: EventViewStore.IMovieStore
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    movieStore: EventViewStore.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface IAppThunkAction<TAction> {
    // tslint:disable-next-line:callable-types
    (dispatch: (action: TAction) => void, getState: () => IApplicationState): void;
}