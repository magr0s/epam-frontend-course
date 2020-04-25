import { RoomState } from './room';

export class Film {
  title: string;
  bio: string;
  directors: string[];
  date: Date;
  genres: string[];
  comments: Comment[];
  availableTime: RoomState[];
}

export class Comment {
  date: Date;
  text: string;
  userId: string;
}
