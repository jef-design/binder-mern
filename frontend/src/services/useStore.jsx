import { create } from 'zustand';

// Get user data from localStorage or set it to null if not found
const userData = JSON.parse(localStorage.getItem('user')) || null;

const useStore = create((set) => ({
  user: userData, // Initialize user with userData

  setLogInUser: (userInfo) =>
    set(() => {
      // Update user state and store in localStorage
      localStorage.setItem('user', JSON.stringify(userInfo));
      return { user: userInfo };
    }),

    setUpdateUser: (userInfo) =>
    set(() => {
      // Update user state and store in localStorage
      localStorage.setItem('user', JSON.stringify(userInfo));
      return { user: userInfo };
    }),

  logOutUser: () =>
    set(() => {
      // Remove user data from localStorage and set user to null
      localStorage.removeItem('user');
      return { user: null };
    }),
}));

export default useStore;


// import { create } from 'zustand'

// const userData = JSON.parse(localStorage.getItem('user'))

// const useStore = create((set) => ({
        
//         user: null,

//         setLogInUser: (userInfo) => set(() => ({user : userInfo})),
//         logOutUser: ( ) => {set(() => ({user : null}))}

    
//     })
// )

// export default useStore