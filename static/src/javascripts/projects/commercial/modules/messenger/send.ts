/**
 * WARNING!
 * Commercial client side code has moved to: https://github.com/guardian/commercial
 * This file should be considered deprecated and only exists for legacy 'hosted' pages
 */

import { postMessage } from '@guardian/commercial-core';

const send = (type: string, payload: unknown): string => {
	const msg = {
		id: 'xxxxxxxxxx'.replace(/x/g, () =>
			((Math.random() * 36) | 0).toString(36),
		),
		iframeId: window.name,
		type,
		value: payload,
	};

	window.top && postMessage(msg, window.top, '*');

	return msg.id;
};

export { send };
