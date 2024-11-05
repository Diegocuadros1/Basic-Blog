import { useState } from "react"

export default function ArticleEntry({ addArticle }) {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [error, setError] = useState(null)

  function submit(e) {
    setError(null)
    e.preventDefault()
    if (!title.trim() || !body.trim()) {
      setError("Both the title and body must be supplied")
    } else {
      addArticle({ title, body })
    }
  }

  return (
    <div className="article-form">
      <form onSubmit={submit}>
        {error && <p className="error">{error}</p>}
        <h1>Title of your post!</h1>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <h2>Write your text here!</h2>
        <textarea
          rows="8"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
