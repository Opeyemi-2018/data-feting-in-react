import { useEffect, useState } from 'react'

// let BASE_URL = "https://jsonplaceholder.typicode.com"

function App() {
  let [isLoading, setIsloading] = useState(false)
  let [error, setError] = useState(false)
  let [users, setUsers] = useState([])
  let [page, setPage] = useState(0)
  // Function to fetch data from the API
  let fetchData = async () => {
    // Set loading state to true before starting the fetch
    setIsloading(true);
    try {
      // Fetch posts from the API
      let response = await fetch('https://jsonplaceholder.typicode.com/users');
      // Parse the JSON response
      let apiUsers = await response.json();
      let users = apiUsers.slice(0, 5)
      // Update the posts state with the fetched data
      setUsers(users);
    } catch (error) {
      // If an error occurs, update the error state
      setError(error);
    } finally {
      // Set loading state to false after fetch completes (success or failure)
      setIsloading(false);
    }
  };
  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures this runs only once after the initial render

  // Conditional rendering based on the loading state
  if (isLoading) {
    return <div>loading...</div>;
  }

  // Conditional rendering based on the error state
  if (error) {
    return <div>something went wrong. try again later</div>;
  }


  return (
    <div>
      <div className='mx-auto w-[700px]'>
        <button onClick={() => setPage(page + 1)} className='bg-purple-800 text-white text-1xl p-3 rounded-md'>increase page {page}</button>
        <h1 className='text-3xl'>data fetching in react</h1>
         <div className='flex justify-between text-3xl my-2'>
            <h1>name</h1>
            <h1>email</h1>
            <h1>address</h1>
         </div>
       
          {users.map((user) => {
          let { id, name, email, address } = user;
            let fullAddress = `${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`;
            return (
              <div key={id} className='flex justify-between'>
                <h1>{name}</h1>
                <h2 className='text-left'>{email}</h2>
                <h2 className='text-left'>{fullAddress}</h2>
              </div>
            )
          })}
       
      </div>
    </div>
  )
}

export default App

