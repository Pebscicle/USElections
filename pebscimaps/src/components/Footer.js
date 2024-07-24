import usaImages from '../data/usaImages.json'

import Link from 'next/link';

function Footer() {
    return (
        <div style={{color: 'white'}}>
            <div className='text-sm px-16 py-8'>
                <div className='py-8 flex justify-between'>
                    <Link key={"terms-of-use"}
                          href={"/terms_of_use"}
                          className=""
                    >
                        <h4>Legal</h4>
                    </Link>
                    <Link key={"privacy-policy"}
                          href={"/privacy_policy"}
                          className=""
                    >
                        <h4>Privacy Policy</h4>
                    </Link>
                        
                </div>
                <p>Placeholder</p>
            </div>
            <h3>Image Credits:</h3>
            {/*Object.entries(usaImages.imageLinks).map(([abbr, url]) => (
                <div key={abbr} style={{maxWidth: 'auto'}}>
                    <abbr>{abbr}</abbr>: 
                    <Link href={url} style={{wordWrap: 'break-word', overflowWrap: 'break-word'}}>{url}</Link>
                </div>
            ))*/}

            <h3>Additional Attributions:</h3>
            <a href="https://www.flaticon.com/free-icons/arrow" title="arrow icons" style={{wordWrap: 'break-word', overflowWrap: 'break-word'}}>Arrow icons created by Kirill Kazachek - Flaticon</a>
        </div>
    );
}


export default Footer;

