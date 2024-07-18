import usaImages from '../data/usaImages.json'

import Link from 'next/link';

function Footer() {
    return (
        <div style={{color: 'white'}}>
            <h3>Image Credits:</h3>
            {Object.entries(usaImages.imageLinks).map(([abbr, url]) => (
                <div key={abbr} style={{maxWidth: 'auto'}}>
                    <abbr>{abbr}</abbr>: 
                    <Link href={url} style={{wordWrap: 'break-word', overflowWrap: 'break-word'}}>{url}</Link>
                </div>
            ))}

            <h3>Additional Attributions:</h3>
            <a href="https://www.flaticon.com/free-icons/arrow" title="arrow icons" style={{wordWrap: 'break-word', overflowWrap: 'break-word'}}>Arrow icons created by Kirill Kazachek - Flaticon</a>
        </div>
    );
}


export default Footer;

