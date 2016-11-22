export class Room {
	_id: string;
	title: string;
	isPrivate: boolean;
	allowedIds: [string];
	userCount: number;
	users: [string];
	tags: [string];
	ownerId: string;
	feed: [Feed];

	constructor(){
		this.isPrivate = false;
	}
}

class Feed {
	text: string;
	username: string;
	userid: string;
	date: Date;
}