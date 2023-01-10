module.exports = [
  {
    input: './src/main.js',
    external: ['node-fetch', 'buffer'],
    output: {
      file: './lib/es/index.js',
      format: 'es',
    },
  },
  {
    input: './src/main.js',
    external: ['node-fetch', 'buffer'],
    output: {
      file: './lib/cjs/index.js',
      format: 'cjs',
      // TODO: find proper way
      intro: `const fetch = require("node-fetch");\nconst {Buffer} = require("buffer");`,
    },
  },
];
