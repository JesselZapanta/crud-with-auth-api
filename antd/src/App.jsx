import { useEffect, useState } from 'react';
import './App.css'
import axios from "axios";
function App() {

  const [data, setData] = useState([]);

  const getData = async () => {
      try {
          const res = await axios.get("/api/test/user");
          console.log(res.data);
          setData(res.data);
      } catch (err) {
          console.log(err);
      }
  };
  

  useEffect(() => {
    getData()
  }, [])

  return (
      <div className="p-12">
          <h1 className="text-xl font-bold mb-4">List of Users</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
  );
  
}

export default App
