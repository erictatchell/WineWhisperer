import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import clientPromise from '../../lib/mongodb';
import { getSession } from 'next-auth/react';
import { isAnyArrayBuffer } from 'util/types';
//import clickSound from '/eastereggSound.mp3';

const NotFoundPage: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const handleClick = (e: React.MouseEvent) => {
    setClickCount(clickCount + 1);
    const audio = new Audio('/eastereggSound.mp3');
    audio.play();
    if (clickCount < 3) {
      e.preventDefault();
    }
  };

  return (
    <div style={{
      fontFamily: 'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      height: '100vh',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div>
        <p>The thing you are looking for is not found.</p>
        <style>{`
          body {
            color: #000;
            background: #fff;
            margin: 0;
          }

          .next-error-h1 {
            border-right: 1px solid rgba(0, 0, 0, .3);
          }

          @media (prefers-color-scheme: dark) {
            body {
              color: #fff;
              background: #000;
            }

            .next-error-h1 {
              border-right: 1px solid rgba(255, 255, 255, .3);
            }
          }
        `}
        </style>
        <Link href="/main/brazil" className='cursor-default'>
          <h1 className="next-error-h1" style={{
            display: 'inline-block',
            margin: '0 20px 0 0',
            paddingRight: '23px',
            fontSize: '24px',
            fontWeight: 500,
            verticalAlign: 'top',
            lineHeight: '49px'
          }}
            onClick={handleClick}>
            404
          </h1>
        </Link>
        <div style={{ 
          display: 'inline-block', 
          textAlign: 'left' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '49px',
            margin: 0
          }}>
            This page could not be found.
          </h2>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const userEmail = session && session.user ? session.user.email : null;
  if (userEmail) {
    const client = await clientPromise;
    const db = client.db();
    const userExtra = await db.collection("userExtras").findOne({ email: userEmail });
    if (userExtra) {
      return {
        props: {
          userId: userExtra.id,
        },
      };
    }
  }
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default NotFoundPage;
