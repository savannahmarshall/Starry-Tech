module.exports = {
    format_date: (date) => {
        // Format date as MM/DD/YYYY
        return date.toLocaleDateString();
      },    
  
  // Helper to check if a user is the author of a post
  isAuthor: (postUserId, currentUserId) => {
    return postUserId === currentUserId; 
  },

  // Helper to check if the user is logged in
  isLoggedIn: (user) => {
    return user ? true : false; 
  },

};