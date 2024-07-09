import usaImages from '../data/usaImages.json'

function Footer() {
    
    return (
        <div style={{color: 'white'}}>
            
            Image Credits:
            {Object.entries(usaImages.imageLinks).map(([abbr, url]) => (
                <p key={abbr}>
                    <abbr>{abbr}</abbr>: <a href={url} style={{ width: '200px', height: '30px', textOverflow: 'ellipsis'}}>{url}</a>
                </p>
            ))}

            Additional Attributions:
            <a href="https://www.flaticon.com/free-icons/arrow" title="arrow icons">Arrow icons created by Kirill Kazachek - Flaticon</a>
        </div>
    );
  }

export default Footer;

