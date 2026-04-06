export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.BjjDzjW_.js",app:"_app/immutable/entry/app.dzXVfD9N.js",imports:["_app/immutable/entry/start.BjjDzjW_.js","_app/immutable/chunks/nCt6s5Kn.js","_app/immutable/chunks/Ckt1Ha01.js","_app/immutable/chunks/CgNjKWBz.js","_app/immutable/entry/app.dzXVfD9N.js","_app/immutable/chunks/Ckt1Ha01.js","_app/immutable/chunks/D0IjR1Lm.js","_app/immutable/chunks/D2XoCLrj.js","_app/immutable/chunks/CgNjKWBz.js","_app/immutable/chunks/D2q9O814.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
