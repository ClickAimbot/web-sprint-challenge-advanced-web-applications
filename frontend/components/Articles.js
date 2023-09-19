import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import PT from 'prop-types';

export default function Articles(props) {
  const [isDisabled, setIsDisabled] = useState(false);
  
  const { articles, getArticles, deleteArticle, setCurrentArticleId, currentArticleId} = props;

  if (!localStorage.getItem('token')) {
    return <Navigate to='/' />;
  }

  useEffect(() => {
    getArticles();
  }, []);

  const handleDelete = (article_id) => {
    deleteArticle(article_id);
  };

  const handleEdit = (article_id) => { 
    setCurrentArticleId(article_id)
    setIsDisabled(true) 
  };

  return (
    <div className="articles">
      <h2>Articles</h2>
      {articles.length === 0 ? (
        'No articles yet'
      ) : (
        articles.map((art) => (
          <div className="article" key={art.article_id}>
            <div>
              <h3>{art.title}</h3>
              <p>{art.text}</p>
              <p>Topic: {art.topic}</p>
            </div>
            <div>
              <button disabled={isDisabled} onClick={() => handleEdit(art.article_id)}>
                Edit
              </button>
              <button disabled={isDisabled} onClick={() => handleDelete(art.article_id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

Articles.propTypes = {
  articles: PT.arrayOf(
    PT.shape({
      article_id: PT.number.isRequired,
      title: PT.string.isRequired,
      text: PT.string.isRequired,
      topic: PT.string.isRequired,
    })
  ).isRequired,
  getArticles: PT.func.isRequired,
  deleteArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticleId: PT.number,
};

