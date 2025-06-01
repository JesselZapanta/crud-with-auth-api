import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../Context/AppContext';

export default function UserIndex() {
    const {token} = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const getData = async () => {
        setLoading(true)
        try{
            const res = await axios.get('/api/admin/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setData(res.data);
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    },[])

    return (
        <div>
            <div>User Index</div>
            <div>
                {loading ? (
                    <>Loading...</>
                ) : (
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                )}
            </div>
        </div>
    );
}

