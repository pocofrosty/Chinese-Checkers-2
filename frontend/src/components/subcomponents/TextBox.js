import React from 'react'

const TextBox = ({ text, setText, backgroundName }) => (
  <input
    className="shadow appearance-none border-rounded py-2 px-3"
    placeholder={backgroundName}
    defaultValue={text}
    onChange={e => setText(e.target.value)}
  />
)

export default TextBox
