import { useRouter } from 'next/router';
import StateInfo from '../components/StateInfo';

import {getStateFromID} from '../services/dbFetcherService';


function StatePage({ stateInfo }) {

  const router = useRouter();
  const { state } = router.query;

  if (!stateInfo) {
    return <div>State not found</div>;
  }

  console.log('state');
  console.log(state);


  return (
    <div>
      <h1>{stateInfo.name}</h1>
      {/* Render other state information here */}
    </div>
  );
}

export async function getStaticPaths() {
  // Example: Fetch all state abbreviations
  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
    'DC'
  ];

  console.log('states');
  console.log(states);
  const paths = states.map(state => ({ params: { state } }));
  console.log('paths');
  console.log(paths);

  return { paths, fallback: false }; // Return null for now, adjust based on your needs
}

export async function getStaticProps({ params }) {
  const stateData = await getStateFromID(params.state);

  console.log(stateData);

  return {
    props: {
      stateData,
    },
  };
}

export default StatePage;
