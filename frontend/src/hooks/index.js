import axios from "axios";
import { useEffect, useState } from "react";

export function useDetail() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [detail, setDetail] = useState({});
  useEffect(() => {
    axios
      .get(`${backendUrl}/user/profile`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setDetail(response.data.user);
      })
      .catch((error) => {
        console.error("Error while fetchin user profile");
      });
  }, []);
  return { detail };
}

export function useAllTodo() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [alltodo, setAllTodo] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${backendUrl}/todo/all`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        // console.log(response.data.AllTodo);
        setAllTodo(response.data.AllTodo);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error while fetchin user profile");
        setLoading(true);
      });
  }, []);
  //   console.log(alltodo);
  return { alltodo, loading };
}
