import { useEffect, useState } from "react";
import { api } from "../api";

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(api.auth)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data.user) {
          setCurrentUser(data.user);
        }
        setLoading(false);
      });
  }, []);
  return { loading, currentUser };
};
