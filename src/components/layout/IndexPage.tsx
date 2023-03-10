import Head from 'next/head';
import React from 'react';

interface IndexPageProp {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

function IndexPage({ title, description, url, image }: IndexPageProp) {
  return (
    <Head>
      <title>Meetion</title>
      <meta property="og:title" content={title || 'Meetion'} />
      <meta
        name="description"
        content={
          description ||
          'Meetion for efficient conferencing with video calls and real-time chat'
        }
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || 'https://meetion.com'} />
      <meta property="og:image" content={image} />
      <meta property="og:article:author" content="bellmin" />
      <link rel="icon" />
    </Head>
  );
}

export default IndexPage;
