import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import axios from "axios";
import Swal from "sweetalert2";

function UseGetAllIncome() {
  const [allIncomeLoading, setAllIncomeLoading] = useState(false);
  const [allIncomeData, setAllIncomeData] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const { user } = useContext(UserContext);
  const userId = user;

  useEffect(() => {
    const fetchUserIncomes = async () => {
      setAllIncomeLoading(true);
      if (!user) {
        console.warn("No user ID found, skipping request.");
        return;
      }
      try {
        const res = await axios.get(`income/get-income/${userId}`);
        if (res.data.success) {
          setAllIncomeData(res.data.result);
          // console.log(res.data.result);
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
        setAllIncomeLoading(false);
      }
    };
    fetchUserIncomes();
  }, [userId, user, refreshKey]);

  return {
    allIncomeData,
    allIncomeLoading,
    refreshKey: () => setRefreshKey((prev) => prev + 1),
  };
}

export default UseGetAllIncome;
