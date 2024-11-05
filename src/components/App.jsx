import { useEffect, useState } from "react"
import Nav from "./Nav"
import Article from "./Article"
import ArticleEntry from "./ArticleEntry"
import { SignIn, SignOut } from "./Auth"
import { useAuthentication } from "../services/authService"
import { fetchArticles, createArticle } from "../services/articleService"
import { GiHamburgerMenu } from "react-icons/gi";

import "./App.css"

export default function App() {
  const [articles, setArticles] = useState([])
  const [article, setArticle] = useState(null)
  const [writing, setWriting] = useState(false)
  const user = useAuthentication()

  // This is a trivial app, so just fetch all the articles only when
  // a user logs in. A real app would do pagination. Note that
  // "fetchArticles" is what gets the articles from the service and
  // then "setArticles" writes them into the React state.
  useEffect(() => {
    if (user) {
      fetchArticles().then(setArticles)
    }
  }, [user])

  

  // Update the "database" *then* update the internal React state. These
  // two steps are definitely necessary.
  function addArticle({ title, body }) {
    createArticle({ title, body }).then((article) => {
      setArticle(article)
      setArticles([article, ...articles])
      setWriting(false)
    })
  }

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Define your breakpoint

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Update state based on window width
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Diego's Blog</h1>
        {user && <button className="new-article" onClick={() => setWriting(true)}>New Article</button>}
        {!user ? <SignIn /> : <SignOut />}
      </header>



      {!user ? (
        <section className="landing">
          <div className="welcome">
            <h1> Welcome to Diego's Blog! </h1>
            <h2> Sign In to get started! </h2>
            <SignIn />
          </div>
          
        </section>
        ) : ""}


      {!user ? "" : <Nav articles={articles} setArticle={setArticle} />}

      {!user ? (
        ""
      ) : writing ? (
        <ArticleEntry addArticle={addArticle} />
      ) : (
        <Article article={article} />
      )}
    </div>
  )
}