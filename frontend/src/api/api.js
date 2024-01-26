// api.js
import axios from "axios";

const API_ENDPOINT = "http://localhost:5000/api/Employee/";

// FETCH ALL DATA
export const fetchEmployeeData = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINT}RetrieveAllData`);

    // Access the 'data' property in the response
    const responseData = response.data;

    if (responseData.result === "SUCCESS") {
      console.log(responseData.message); // Log success message
      return responseData.data;
    } else {
      console.error("Error fetching Employee data:", responseData.message);
      throw new Error(responseData.message);
    }
  } catch (error) {
    console.error("Error fetching Employee data:", error);
    throw error;
  }
};

// FETCH ALL DATA WITH LIMIT
export const fetchEmployeeDataWithLimit = async (
  pageNumber,
  pageSize,
  searchQuery
) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}ListData`, {
      params: {
        PageNumber: pageNumber,
        PageSize: pageSize,
        SearchQuery: searchQuery || null,
      },
    });

    // Access the 'data' property in the response
    const responseData = response.data;

    if (responseData.result === "SUCCESS") {
      console.log(responseData.message); // Log success message
      return {
        data: responseData.data,
        totalCount: responseData.totalCount,
      };
    } else {
      console.error(
        "Error fetching Employee data:",
        responseData.error_message
      );
      throw new Error(responseData.error_message);
    }
  } catch (error) {
    console.error("Error fetching Employee data:", error);
    throw error;
  }
};

// FETCH DATA BY ID
export const getDataById = async (employeeId) => {
  try {
    const response = await axios.get(
      `${API_ENDPOINT}RetrieveDataById/${employeeId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching Employee Id (${employeeId}):`, error);
    throw error;
  }
};

// ADD DATA
export const addData = async (newData) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}SaveData`, newData);
    const result = response.data;

    return result;
  } catch (error) {
    console.error("Error adding Employee:", error);

    // Check if there's a response and if it has data
    if (error.response && error.response.data) {
      console.error("Error details:", error.response.data);
      throw error.response.data; // Throw the response data as an error
    } else {
      throw error; // Throw the original error if no response data
    }
  }
};



export const deleteData = async (employeeId) => {
  try {
    const response = await axios.delete(
      `${API_ENDPOINT}DeleteData/${employeeId}`
    );

    // Check if the response has a success status
    if (response.status === 200 && response.data.status === "SUCCESS") {
      console.log("Response from server:", response.status);
      console.log("Data:", response.data);
      return response.data;
    } else {
      // Handle unexpected response format or error from the server
      console.error("Unexpected response format:", response);
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    // Handle network errors or errors from the server
    console.error("Error deleting employee:", error.message);
    throw error;
  }
};


export const updateData = async (employeeId, updatedData) => {
  try {
    const response = await axios.put(
      `${API_ENDPOINT}UpdateData/${employeeId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating Employee:", error);
    throw error;
  }
};