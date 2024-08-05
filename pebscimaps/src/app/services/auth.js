export const fetchUser = async () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      alert('No token found, please login first');
      return;
    }
  
    try {
      const res = await fetch('/api/get-user', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
  
      if (res.ok) {
        const data = await res.json();
        return data.user;
      } else {
        alert('Failed to retrieve profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      alert('An error occurred while fetching the profile');
    }
  };