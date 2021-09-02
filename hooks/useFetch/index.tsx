import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
interface UseFetchProps {
      url: string;
      func?: () => {}
}

export default function useFetch({url, func}: UseFetchProps) {
      const [state, setState] = useState({data: null,  error: null, loading: true});

      useEffect(() => {
            axios.get(url).then(res =>{
                  setState({ data: res.data, error: null, loading: false })
            }).catch(err =>{
                  setState({ data: null, error: err, loading: false })
            })
            
      }, [url])
      return state;
}