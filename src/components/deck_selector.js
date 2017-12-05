import React, {Component} from 'react';

const DeckSelector = (props) => {
	const deckTitles = props.allDecks.decks.map((value) => {
		return (
			<button className="mt3 ml2 mr2 tc">{value.deckname}</button>
		);
	});

	return (
		<div className="cf">
			<div id="deckselector" className="center">
				{deckTitles}
			</div>
		</div>
	);
}

export default DeckSelector;
