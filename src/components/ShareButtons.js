// <!-- Created by: Ayushi Amin ; Last Edited: Aug 2, 2024 -->
import React from 'react';
import { FacebookShareButton, TwitterShareButton } from 'react-share';

function ShareButtons({ url, title }) {
  return (
    <div>
      <FacebookShareButton url={url} quote={title}>
        Share on Facebook
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        Share on Twitter
      </TwitterShareButton>
    </div>
  );
}

export default ShareButtons;
