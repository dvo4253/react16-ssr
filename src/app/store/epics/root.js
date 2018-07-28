import { combineEpics } from 'redux-observable';
import { delay, mapTo } from 'rxjs/operators';
import { PONG } from '../actions';

const pingEpic = action$ => action$.ofType('PING').pipe(
	delay(1000), // Asynchronously wait 1000ms then continue
	mapTo({ type: PONG }),
);

export default combineEpics(
	pingEpic,
);
