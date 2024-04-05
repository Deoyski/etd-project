
const BASE_URL="http://localhost:3000";

export const getCiriJenazah = () => {
    return async (dispatch) => {
      try {
        const response = await fetch(`${BASE_URL}/ciri-jenazah`, {
            method: "GET"
          });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        dispatch({ type: "GET_CIRI_JENAZAH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "GET_CIRI_JENAZAH_FAILED", payload: error.message });
      }
    };
  };

