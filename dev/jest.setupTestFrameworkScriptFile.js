// Polyfill test environment (done by polyfill.io in production)
require('core-js');

jest.mock('../static/src/javascripts/projects/commercial/am-i-used', () => ({
    amIUsed: jest.fn()
}));


// Stub global Guardian config
// eslint-disable-next-line id-denylist -- this is on purpose
window.guardian = {
	config: {
		switches: {},
		page: {
            idApiUrl: 'https://idapi.theguardian.com',
            idUrl: 'https://profile.theguardian.com',
        },
		images: {
			commercial: {},
		},
		libs: {},
        ophan: {
            browserId: 'dummy_bwid_24680'
        }
	},
    ophan: {
        pageViewId: 'dummy_pvid_123456790',
    },
	css: {},
	adBlockers: {
		active: undefined,
		onDetect: [],
	},
};

// Stub matchmedia
window.matchMedia =
	window.matchMedia ||
	jest.fn().mockImplementation(() => ({
            matches: false,
            addListener: jest.fn(),
            addEventListener: jest.fn(),
        }));

