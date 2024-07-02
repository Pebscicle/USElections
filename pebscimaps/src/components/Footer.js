import usaImages from '../data/usaImages.json'

function Footer() {
    
    return (
        <div style={{color: 'white', marginTop: '50px'}}>
            
            Image Credits:
            {Object.entries(usaImages.imageLinks).map(([abbr, url]) => (
                <p key={abbr}>
                    <abbr>{abbr}</abbr>: <a href={url} style={{ width: '200px', height: '30px', textOverflow: 'ellipsis'}}>{url}</a>
                </p>
            ))}
        </div>
    );
  }

export default Footer;

