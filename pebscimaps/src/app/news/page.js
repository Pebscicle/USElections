'use client';

import {useState, useEffect} from 'react';

import axios from 'axios';
import {fetchNews} from '../services/newsService';

function PrivacyPolicy() {
    
  const [news, setNews] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedNews = await fetchNews('http://localhost:3000/api/get-news');
        console.log(fetchedNews);
        setNews(fetchedNews);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div style={{minHeight: '100vh', color: 'black'}}>
        {news?.rows && news.rows.map((item, index) => (
          <div key={index}>
            {/* Display the news item details here */}
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            <small>Author: {item.author}</small>
          </div>
        ))}
      </div>
    </>
  );
}

export default PrivacyPolicy;