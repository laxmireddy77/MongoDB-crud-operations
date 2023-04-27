
import './App.css';

function App() {
  let getDataFromServer=async()=>{
    let reqOptions={
      method:"GET"
    }
    let JSONData=await fetch("http://localhost:4444/getData",reqOptions);
    let JSOData=await JSONData.json();
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
