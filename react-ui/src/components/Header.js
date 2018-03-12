import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'tachyons-components';

const Header = () => (
	<header>
		<nav>
			<ul className="tc dib">
				<li><Link to='/decklist'>Deck List</Link></li>
				<li><Link to='/newdeck'>New Deck</Link></li>

			</ul>
		</nav>
	</header>
)

export default Header;
