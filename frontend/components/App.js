import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'

import axiosWithAuth from '../axios/index'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  console.log('articles: ', articles);
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => { navigate('./') }
  const redirectToArticles = () => { navigate('./articles') }

  const logout = () => {
    // ✨ implement
    // If a token is in local storage it should be removed,
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token')
      setMessage('Goodbye!')
      redirectToLogin()
    }
  }

  const login = ({ username, password }) => {
    // ✨ implement
    const token = localStorage.getItem('token')
    // We should flush the message state, turn on the spinner
    setMessage('')
    setSpinnerOn(true)
    // and launch a request to the proper endpoint.
    axiosWithAuth()
      .post(loginUrl, { username, password })
      .then(res => {
        localStorage.setItem('token', res.data.token)
        setMessage(res.data.message)
        setSpinnerOn(false) 
        redirectToArticles()
      })
      .catch(err => {
        setMessage(err.response.data.message)
        setSpinnerOn(false)
      })
    // On success, we should set the token to local storage in a 'token' key,
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!
  }

  const getArticles = () => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    setMessage('')
    setSpinnerOn(true)
    // and launch an authenticated request to the proper endpoint.
    axiosWithAuth()
      .get(articlesUrl)
      .then(res => {
        setArticles(res.data.articles)
        setMessage(res.data.message)
        setSpinnerOn(false)
      })
      .catch(err => {
        setMessage(err.response.data.message)
        if (err.response.status === 401) {
          redirectToLogin()
        }
        setSpinnerOn(false)
      })
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!
  }
  
  const postArticle = article => {
    // ✨ implement
    setMessage('')
    setSpinnerOn(true)
    axiosWithAuth()
      .post('./articles', article)
      .then(res => {
        setArticles([...articles, res.data.article])
        setMessage(res.data.message)
        setSpinnerOn(false)
      })
      .catch(err => {
        setMessage(err.response.data.message)
        if (err.response.status === 401) {
          redirectToLogin()
        }
        setSpinnerOn(false)
      })
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
  }

  const updateArticle = ({ article_id, article }) => {
    console.log('article: ', article);
    console.log('article_id: ', article_id);
    setMessage('')
    setSpinnerOn(true)
    axiosWithAuth()
      .put(`./articles/${article_id}`, article)
      .then(res => {
        const updatedArticles = articles.map(article => article.article_id === article_id ? res.data.article : article)
        setArticles(updatedArticles)
        setMessage(res.data.message)
        setSpinnerOn(false)
      })
      .catch(err => {
        setMessage(err.response.data.message)
        if (err.response.status === 401) {
          redirectToLogin()
        }
        setSpinnerOn(false)
      })
  }

  const deleteArticle = article_id => {
    // ✨ implement
    setMessage('')
    setSpinnerOn(true)
    axiosWithAuth()
      .delete(`./articles/${article_id}`)
      .then(res => {
        setArticles(articles.filter(art => art.article_id !== article_id))
        setMessage(res.data.message)
        setSpinnerOn(false)
      })
      .catch(err => {
        setMessage(err.response.data.message)
        if (err.response.status === 401) {
          redirectToLogin()
        }
        setSpinnerOn(false)
      })
  }

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
      <Spinner on={spinnerOn}/> 
      <Message message={message} /> 
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}>
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login} />} />
          <Route path="articles" element={
            <>
              <ArticleForm 
                articles={articles}
                updateArticle={updateArticle}  
                postArticle={postArticle} 
                setCurrentArticleId={setCurrentArticleId}
                currentArticle={articles.find(article => article.article_id === currentArticleId)}
                />
              <Articles 
                articles={articles} 
                getArticles={getArticles} 
                deleteArticle={deleteArticle} 
                setCurrentArticleId={setCurrentArticleId}
                currentArticleId={currentArticleId}
              /> 
            </>
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  )
}
