import { useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [page, setPage] = useState(8);
  const [display, setDisplay] = useState(true);

  async function generateData() {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?page=${page}&query=${inputText}&client_id=dzatmUPsioxWAeCnBQCjlTIziqxeCcPhSALObyPd6YQ&per_page=${page}`
      );
      console.log(response.data.results);
      setData(response.data.results);
    } catch {}
  }

 

  return (
    <>
     <div className="main">
        <br />
        <h2>Image Search App</h2>

        <input style={{padding:"10px 20px", margin:"10px"}}
          type="text"
          placeholder="Search Image"
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        />
        <button onClick={generateData}>Generate Image</button>
        {display ? (
          <div className="cards" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr "}}>
            {data.map((ele, index, array) => {
              return (
                <div className="card" key={ele.id} >
                  {/* console.log(data); */}
                  <img src={ele.urls.small} alt="" />
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}

        <button
          id="load"
          onClick={() => {
            setPage((prev) => prev + 10);
            generateData();
            setDisplay(true);
          }}
        >
          Load More
        </button>
      </div>
    </>
  )
}

export default App
