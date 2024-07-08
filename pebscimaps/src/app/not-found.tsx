import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div style={{color: 'black', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
    }}>
      <h2>Page Not Found :(</h2>
      <p>Could not find the requested page or it is in development.</p>
      <Link href="/">Return <span style={{color: 'blue'}}>Home</span></Link>

      <img src={'https://www.svgrepo.com/show/1750/compass.svg'} style={{width: '25%', height: 'auto', paddingTop: '10%'}}/>
    </div>
  )
}