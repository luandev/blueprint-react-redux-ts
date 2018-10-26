import * as React from 'react';
import { Alignment, Button, Navbar } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import './header.scss';





// import logo from './logo.svg';
export interface IHeaderState {
	filter?: number
}

export default class Header extends React.Component<{}, IHeaderState> {
	
	constructor(props: any) {
		super(props);

		this.state = { filter: null };
	}

	public render() {
		return (
			<div className="Header">
				<Navbar>
					<Navbar.Group align={Alignment.LEFT}>
						<Navbar.Heading>Movies</Navbar.Heading>
						<Navbar.Divider />
					</Navbar.Group>
					<Navbar.Group align={Alignment.RIGHT}>
						<Navbar.Divider />
						<Link to="/">
							<Button minimal={true} icon="home" text="Home" />
						</Link>
					</Navbar.Group>
				</Navbar>
			</div>
		);
	}
}
