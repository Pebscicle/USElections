import { useRouter } from 'next/router';
import StateInfo from '../components/StateInfo'; // Assuming you have a component to display state info

export async function getStaticPaths() {
  // Example: Fetch all state abbreviations
  const states = ['AL', 'AK', 'AZ']; // Replace with actual data fetching logic
  const paths = states.map(state => ({ params: { state } }));

  return { paths, fallback: false }; // Return null for now, adjust based on your needs
}

export async function getStaticProps({ params }) {
  // Fetch state information based on the state abbreviation
  const stateData = {}; // Replace with actual data fetching logic

  return {
    props: {
      stateData,
    },
  };
}

function StatePage() {
    const router = useRouter();
    const { state } = router.query;
  
    // Fetch data for the state based on the 'state' variable
    // This is a placeholder for your data fetching logic
    const stateData = fetchDataForState(state);
    console.log("stateData: " + stateData);
  
    return (
      <div>
        <h1>{stateData.name}</h1>
        {/* Render other state information here */}
      </div>
    );
  }

export default StatePage;
