const { apply } = require("function-bind")

module.exports = {
	content: ['index.html', 'dist/js/script.js'],
	theme: {
		extend: {
			backgroundImage: {
				// 'back-splash': "url('https://source.unsplash.com/1280x720?nature')",
				// 'back-splash': "url('https://source.unsplash.com/854x480?nature')",
				'splash1': "url('../../dist/img/background/1.jpg')",
				'splash2': "url('../../dist/img/background/2.jpg')",
				'splash3': "url('../../dist/img/background/3.jpg')",
				'splash4': "url('../../dist/img/background/4.jpg')",
				'splash5': "url('../../dist/img/background/5.jpg')",
				'splash6': "url('../../dist/img/background/6.jpg')",
				'splash7': "url('../../dist/img/background/7.jpg')",
				'splash8': "url('../../dist/img/background/8.jpg')",
				'splash9': "url('../../dist/img/background/9.jpg')",
				'splash10': "url('../../dist/img/background/10.jpg')",
				'splash11': "url('../../dist/img/background/11.jpg')",
				'splash12': "url('../../dist/img/background/12.jpg')",
				'splash13': "url('../../dist/img/background/13.jpg')",
				'splash14': "url('../../dist/img/background/14.jpg')",
				'splash15': "url('../../dist/img/background/15.jpg')",
				'splash16': "url('../../dist/img/background/16.jpg')",
				'splash17': "url('../../dist/img/background/17.jpg')",
			},
			backgroundSize: {
				'custom': '4rem',
			},
			fontFamily: {
				inter: ['Inter'],
			},
			animation: {
				'fade-in': 'tampil 2s linear forwards',
				'fade-in-out': 'fade-in-out 5s linear forwards',
				'fade-and-shrink': 'tampil 2s linear forwards, shrink 0.5s linear forwards 2s',
			},
			keyframes: {
				'tampil': {
					'0%': {
						opacity: 0,
					},
					'20%': {
						opacity: 1,
					},
					'100%': {
						opacity: 1,
					},
				},
				'fade-in-out': {
					'0%': {
						opacity: 0,
					},
					'30%': {
						opacity: 1,
					},
					'85%': {
						opacity: 1,
					},
					'100%': {
						opacity: 0,
					},
				},
				'shrink': {
					'0%': {
						transform: 'scale(1)',
					},
					'100%': {
						transform: 'scale(0.4)',
						top: '-70px',
					},
				},
			},
		},
	},
	plugins: [],
};
