/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    space: {
      borderspace: '1px',
    },
    height: {
      main: '865px',
      navbar: '140px',
      availablequests: '34vh',
      hiddenavailablequests: '0px',
      questinfocontainer: '750px',
    },
    borderRadius: {
      questinfo: '20px',
      md: '10px',
      lg: '15px',
    },
    extend: {
      colors: {
        red: '#ff0102',
        vividorangepeel: '#ffa200',
        electricgreen: '#1dff00',
        mediumspring: '#00ff9e',
        seagreen: '#00ffd2',
        aqua: '#01ffff',
        azure: '#0197ff',
        electricultramarine: '#2901ff',
        electricindigo: '#6701ff',
        fuschia: '#ff00ff',
        fashionfuschia: '#e90091',
        folly: '#ff005c',
        sunsetorange: '#ff5752',
        deepsaffron: '#ff9226',
        sunny: '#ffff7b',
        springfrost: '#84ff2c',
        screaminggreen: '#54ff64',
        malachitegreen: '#61ff87',
        turquoise: '#52ffdc',
        electricblue: '#70eeff',
        violetblue: '#7175d7',
        paleviolet: '#c385ff',
        frenchpink: '#f864a3',
        heliotrope: '#e071ed',
        canary: '#ffff9a',
        venetianred: '#c15b00',
        avocado: '#4b8200',
        candyapplered: '#a20000',
        viridian: '#008051',
        midnightgreen: '#004851',
        resolutionblue: '#001c8d',
        imperialpurple: '#4c0043',
        burgundy: '#81002b',
        metallicsunburst: '#9e8646',
        fielddrab: '#624f1a',
        lightyellow: '#ffffe5',
        philippinegray: '#8d8d8d',
        arsenic: '#424242',
        lightbg: '#ffffe4',
        darkbg: '#ffebad',
        headertext: '#fffce5',
        accordiontext: '#844f16',
        questinfobg: '#d0bd8b',
        navbarbg: '#c4821f',
        refreshbarbg: '#fee4b8',
        homepagebg: '#fff2cf',
        questinfoheadercolor: '#fffce5',
        queststepsbg: '#f7f2c8',
        queststepstext: '#7c5034',
        questrewardbg1: '#ffe5ac',
        questrewardbg2: '#ffefc7',
        questrewardtext: '#7c5034',
        questrewardnumber: '#7c5034',
        queststepbg2: '#fffff5',
      },
      transitionProperty: {
        'height': 'height',
      },
    },
    fontSize: {
      navtab: '.7vw',
      questinfoheader: '22px',
      queststepstextsize: '14px',
      questrewardtextsize: '12px',
      questrewardnumbersize: '12px',
      previousquestsize: '18px',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

