import mitt from 'mitt';
import { Reaction } from './types';

type Events = {
  reaction: Reaction;
}

const bus = mitt<Events>();

export default bus;
