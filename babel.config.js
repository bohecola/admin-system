module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'prismjs',
      {
        languages: ['json', 'javascript', 'typescript', 'bash', 'css', 'html', 'markup', 'java', 'c', 'cpp', 'go', 'php', 'sass', 'scss'],
      },
    ]
  ]
}
