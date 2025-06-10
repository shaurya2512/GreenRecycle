/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			spacing: {
				120: "30rem",
				128: "32rem",
				140: "35rem",
				200: "50rem",
				240: "60rem",
				256: "64rem",
			},
			height: {
				104: "26rem",
				128: "32rem",
				140: "35rem",
				200: "50rem",
				240: "60rem",
				336: "84rem",
			},
		},
	},
	plugins: [],
};
