import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import axios from "axios";
import Swal from "sweetalert2";

function UseGetUser() {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState([]);
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const userId = user;

  useEffect(() => {
    const fetchUser = async () => {
      setUserDataLoading(true);
      if (!user) {
        console.warn("No user ID found, skipping request.");
        return;
      }
      try {
        const res = await axios.get(`users/profile-data/${userId}`);
        if (res.data.success) {
          setUserData(res.data.user);
        }
      } catch (error) {
        console.log(error);
        const errorMessage =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : "An unexpected error occurred. Please try again later.";

        Swal.fire({
          icon: "warning",
          title: "Error",
          text: errorMessage,
        });
      } finally {
        setUserDataLoading(false);
      }
    };

    fetchUser();
  }, [refreshKey, userId, user]);

  return {
    userData,
    userDataLoading,
    refreshKey: () => setRefreshKey((prev) => prev + 1),
  };
}

export default UseGetUser;
