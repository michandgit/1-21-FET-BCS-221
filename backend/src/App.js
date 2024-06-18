import React  ,{ useState } from 'react'
import axios from 'axios'

const App = () => {
  const [numberId , setNumberId] = useState('')
  const [res , setRes] = useState(null)
  const [error,  setError] = useState(null)

  const handleSubmit = async(e)=>{
    e.preventdefault();
    setError(null);
    try{
      const response = await axios.get(`http://localhost:9876/numbers/${numberId}`)
      setRes(response.data);
    }catch(err){
      setError(err.response?.data?.error ||'An error occurred')
    }
  }
  return (
    <div className='App'>
      <h1>Average Calculator</h1>
      <form onSubmit ={handleSubmit}>
        <input
          type="text"
          value = {numberId}
          onChange={(e)=>setNumberId(e.target.value)}
          placeholder='Enter number ID'
        />

        <button type='submit'>Calculate Average</button>
      </form>
      {error && <p style = {{color:'red'}}>{error}</p>}
      {res && (
        <div>
          <h2>Result</h2>
          <pre>{JSON.stringify(res , null ,2)}</pre>
        </div>

      )}
    </div>
  )
}

export default App
