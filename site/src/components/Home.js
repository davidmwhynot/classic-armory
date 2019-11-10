import React from 'react';
import RecentUploads from './RecentUploads';

const Home = () => {
	return (
		<div className="home container">
			<p className="lead">
				Press <kbd>ctrl</kbd>+<kbd>v</kbd> anywhere on this page to
				create a shareable armory page for your character.
			</p>
			<h3>How does this work?</h3>
			<h6>
				1. Download the addon{' '}
				<a
					href="https://www.curseforge.com/wow/addons/classic-armory"
					target="_blank"
				>
					here
				</a>
				.
			</h6>
			<h6>
				2. Press <kbd>C</kbd> to open the character menu and click{' '}
				<em className="text-success">Upload</em>.
			</h6>
			<h6>
				3. Press <kbd>ctrl + c</kbd> in WoW.
			</h6>
			<h6>
				4. Press <kbd>ctrl + v</kbd> anywhere on this website.
			</h6>
			<h6>5. Share your characters URL anywhere!</h6>
			<RecentUploads />
		</div>
	);
};
export default Home;
