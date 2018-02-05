import { FeedEntry } from './feed-entry';

export interface Feed {
  status: string;
  items: Array<FeedEntry>;
}
