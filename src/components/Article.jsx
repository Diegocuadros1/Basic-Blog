export default function Article({ article }) {
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    
    const dateObj = timestamp.seconds
      ? new Date(timestamp.seconds * 1000) // Firestore Timestamp
      : new Date(timestamp); // Regular date object or string

    // Format the date (e.g., "October 15, 2024")
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article>
      {!article ? (
        <p className="no-article">No article selected</p>
      ) : (
        <section>
          <h2>{article.title}</h2>
          <p className="date">{`Posted: ${formatDate(article.date)}`}</p>
          <p className="body">{article.body}</p>
        </section>
      )}
    </article>
  )
}
