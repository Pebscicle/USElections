export default function LoadingPage() {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        width: '100vw',
        backgroundColor: '#f9f9f9'
      }}>
        <h2>Loading...</h2>
        {/* You can add a spinner or any other loading indicator here */}
      </div>
    );
  }