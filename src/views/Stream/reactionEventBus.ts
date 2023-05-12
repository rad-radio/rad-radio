import mitt from 'mitt';
import { Reaction } from './reactions';

type Events = {
  reaction: Reaction;
}

const bus = mitt<Events>();

export default bus;
