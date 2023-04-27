
import './App.css';

function App() {
  const getDataFromServer=async()=>{
    const reqOptions={
      method:"GET"
    }
    const JSONData=await fetch("http://localhost:4444/getData",reqOptions);
    const JSOData=await JSONData.json();
    console.log(JSOData);
  }
  return (
    <div className="App">
     <button onClick={()=>{
      getDataFromServer();
     }}>Get Data</button>
    </div>
  );
}

export default App;
