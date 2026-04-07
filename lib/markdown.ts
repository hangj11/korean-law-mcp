import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang, ignoreIllegals: true })
          .value
      } catch (__) {}
    }
    return '' // use external default escaping
  },
})

export function renderMarkdown(text: string): string {
  return md.render(text)
}
