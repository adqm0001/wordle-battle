import { useState } from 'react'

function GuessInput({onSubmit} : {onSubmit: (word: string) => void }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  
  function handleSubmit() {
    if (input.length === 5){
      onSubmit(input);
      setInput('');
      setError('');
    } else {
      setError('Word is not 5 letters!');
    }
  };

  return (
    <div>
      <input value={input} onChange = {v => setInput(v.target.value)} />
      <p> {error} </p>
      <button onClick = { handleSubmit }>Submit</button>
    </div> 
  )
};

export default GuessInput;
