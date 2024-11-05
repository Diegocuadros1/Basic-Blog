import { FaArrowAltCircleRight } from "react-icons/fa";


export default function Nav({ articles, setArticle }) {
  return (
    <nav className="navigation">
      {!articles
        ? "No articles"
        : articles.map((a) => (
            <p key={a.id} onClick={() => setArticle(a)}>
              {a.title}
            </p>
          ))}
    </nav>
  )
}
