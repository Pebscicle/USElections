'use client';

import {useState, useEffect} from 'react';

import axios from 'axios';
import {fetchNews} from '../services/newsService';

function PrivacyPolicy() {
    
  const [news, setNews] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedNews = await fetchNews();
        console.log(fetchedNews);
        setNews(fetchedNews);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(news);
  }, [news]);

  return (
    <>
      <div className="min-h-screen px-2 sm:px-20 md:px-20 lg:px-96" style={{color: 'black', paddingTop: '10vh', textAlign: 'justify'}}>

        <h1 style={{display: 'flex', width: '100%', justifyContent: 'center', padding: '32px 0px'}}>Atlaster News and Updates</h1>

        {news?.rows && news.rows.map((item, index) => (
          <div key={index}>
            {/* Display the news item details here */}
            <div stlye={{paddingBottom: '8px'}}>
              <div style={{display: 'flex', alignItems: 'flex-end'}}>
                <h2>{item.title}</h2>
                <span style={{paddingLeft : '8px'}}>by {item.author}</span>
              </div>
              <small>Posted on {item.datetime}</small>
            </div>

            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default PrivacyPolicy;