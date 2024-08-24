import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/profile'); // Replace with your API endpoint
        setUser(response.data); // Update state with the fetched data
      } catch (error) {
        console.error('Failed to fetch user profile', error);
        setUser(null); // Set user to null if there is an error
      }
    };

    fetchData();
  }, []); // Run only once on component mount

  console.log(user)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
