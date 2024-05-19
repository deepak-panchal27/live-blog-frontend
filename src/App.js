import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import TitleDescriptionPost from './components/TitleAndDescription';
import TitleImagePost from './components/TitleAndDescriptionAndImage';
import TitleScrapedPagePost from './components/TitleAndScrapedDataAndURL';
import TitleFacebookPost from './components/TitleAndFacebookPost';
import TitleTwitterPost from './components/TitleAndTwitterPost';
import { Container } from '@mui/material';

const App = () => {
  return (
    <Router>
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blog/:blogId" element={<BlogPost />} />
          <Route path="/blog/:blogId/title-description" element={<TitleDescriptionPost />} />
          <Route path="/blog/:blogId/title-image" element={<TitleImagePost />} />
          <Route path="/blog/:blogId/title-scraped-page" element={<TitleScrapedPagePost />} />
          <Route path="/blog/:blogId/title-facebook" element={<TitleFacebookPost />} />
          <Route path="/blog/:blogId/title-twitter" element={<TitleTwitterPost />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
