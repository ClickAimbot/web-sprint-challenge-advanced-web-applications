import React, { useEffect, useState } from 'react'
import PT from 'prop-types'

const initialFormValues = 
  { 
    title: '', 
    text: '', 
    topic: '' 
  }
export default function ArticleForm(props) {
  const [values, setValues] = useState(initialFormValues);
  // const [currentArticle, setCurrentArticle] = useState(null)

  // ✨ where are my props? Destructure them here
  const { postArticle, updateArticle, setCurrentArticleId, currentArticle} = props  
  console.log('currentArticle: ', currentArticle);

  useEffect(() => {
    if (currentArticle) {
      setValues(currentArticle)
    } 
    // ✨ implement
    // Every time the `currentArticle` prop changes, we should check it for truthiness:
    // if it's truthy, we should set its title, text and topic into the corresponding
    // values of the form. If it's not, we should reset the form back to initial values.
  }, [currentArticle])

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    // We must submit a new post or update an existing one,
    if (currentArticle) {
      const article = {
        title: values.title,
        text: values.text,
        topic: values.topic
      }
      const updatedArticle = {
        article_id: currentArticle.article_id,
        article: article
      }
      // updateArticle expects an object shaped like this:
      // { article_id: 1, article: { title: 'foo', text: 'bar', topic: 'baz' } }
      updateArticle(updatedArticle);
    } else {
      postArticle(values)
    }
    setValues({ 
      title: '', 
      text: '', 
      topic: '' 
    })
    setCurrentArticleId(null)
    // depending on the truthyness of the `currentArticle` prop.
  }

  const onCancelEdit = () => {
    setValues(initialFormValues);
    setCurrentArticleId(null);
  }

  const isDisabled = () => {
    // ✨ implement
    // Make sure the inputs have some values
    return values.title.trim().length < 1 || values.text.trim().length < 1 || values.topic.trim().length < 1
  }

  return (
    // ✨ fix the JSX: make the heading display either "Edit" or "Create"
    // and replace Function.prototype with the correct function
    <form id="form" onSubmit={onSubmit}>
      <h2>{currentArticle ? 'Edit' : 'Create' } Article</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={values.title}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={values.text}
        placeholder="Enter text"
        id="text"
      />
      <select onChange={onChange} id="topic" value={values.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      <div className="button-group">
        <button disabled={isDisabled()} id="submitArticle">Submit</button>
        <button onClick={onCancelEdit}>Cancel edit</button>
      </div>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({ // can be null or undefined, meaning "create" mode (as opposed to "update")
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })
}
 
