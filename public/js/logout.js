const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include' 
    });

    if (response.status === 200) {
        document.location.replace('/');  
    } else {
        alert('You were not logged in or an error occurred.');
    }
};

document.querySelector('#logout').addEventListener('click', logout);
  
  