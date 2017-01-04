export class Room {
	_id: string;
	title: string;
	isPrivate: boolean;
	allowedIds: Array<string>;
	userCount: number;
	users: [string];
	tags: [string];
	ownerId: string;
	feed: [Feed];

	constructor(){
		this.isPrivate = false;
		this.allowedIds = [];
	}
}

class Feed {
	text: string;
	username: string;
	userid: string;
	date: Date;
}