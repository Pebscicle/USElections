import Image from "next/image";

import Dashboard from '../components/Dashboard';
import WorldMap from '../app/WorldMap';

export default function Home() {
  return (
    <main className="" style={{color: 'black'}}>
      <Dashboard>
        <WorldMap infoType='general' />
      </Dashboard>
    </main>
  );
}
