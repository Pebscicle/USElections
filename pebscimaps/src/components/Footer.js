import usaImages from '../data/usaImages.json'

function Footer() {
    
    return (
        <div style={{color: 'white', marginLeft: '200px', marginTop: '50px'}}>
            
            Image Credits:
            {Object.entries(usaImages.imageLinks).map(([abbr, url]) => (
                <p key={abbr}>
                    <abbr>{abbr}</abbr>: <a href={url}>{url}</a>
                </p>
            ))}
        </div>
    );
  }

export default Footer;

