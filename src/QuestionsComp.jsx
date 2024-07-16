import React from 'react'

const Questions = ({question, id, handleChange}) => {
  return (
    <div className="questions">
        <label>{question}</label>
        <input type="radio" id={id} onChange={handleChange} name={question}  value="Yes" />
        <label>Yes</label>
        <label></label>
        <input type="radio" id={id} onChange={handleChange} name={question} value="No" />
        <label>No</label>
    </div>
  )
}

export default Questions