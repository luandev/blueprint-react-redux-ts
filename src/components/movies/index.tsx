import * as MovieStore from 'src/store/movie';
import * as React from 'react';
import { actionCreators } from 'src/store/movie/';
import { Button } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { IApplicationState } from 'src/store';
import { Link, RouteComponentProps } from 'react-router-dom';
import './movies.scss';



type MoviesProps = MovieStore.IMovieStore
    & typeof actionCreators
    & RouteComponentProps<{ gamePK: string }>;

class Movies extends React.Component<MoviesProps, {}> {

    constructor(props: MoviesProps) {
        super(props);
    }

    public render() {
        this.props.Load();

        const movies = this.props.movies.map((m, i) => 
        <li key={i}>
            <Link to={`/movie/${m.id}`}>
                <Button icon="ninja" text="view" />
            </Link>
            {m.title}
        </li>);

        return <ul>
            {movies}
        </ul>;
    }
}

const MoviesComponent = connect((state: IApplicationState) => state.movieStore, MovieStore.actionCreators)(Movies);
export default MoviesComponent;