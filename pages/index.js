import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState,useEffect  } from 'react';
import { createClient } from '@supabase/supabase-js';
import Modal from '../component/Modal.js';
import Cookies  from 'js-cookie';

export default function Home() {
  const supabase = createClient(
    'https://athsblruknhjhbecbiyi.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0aHNibHJ1a25oamhiZWNiaXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgwNTEzMjksImV4cCI6MjAyMzYyNzMyOX0.lWjxvTTO5KNxHSoF2Gbopqxcx9KlfM2oa_bBI1PvioM'
  );

  const [names, setNames] = useState(['pieter', 'aaron', 'racel', 'emir', 'rehan']);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQueueClick = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleRemoveCurPlayer = () =>{
    const newNames = [...names]; // Create a shallow copy of the names array
    newNames.splice(0, 2); // Remove the first two items
    setNames(newNames);
  };

  const handleQueue = (newName) => {
    setNames([...names, newName]);
    setIsModalOpen(false);
  };



  const [actionPerformed, setActionPerformed] = useState(false);
  useEffect(() => {
    // Check if the device has already performed the action
    const deviceAction = Cookies.get('deviceAction');
    if (deviceAction === 'true') {
      setActionPerformed(true);
    }
  }, []);

  const performAction = () => {
    // Perform the action if it hasn't been performed already
    if (!actionPerformed) {
      // Perform the action here

      // Set a cookie to track that the action has been performed by this device
      Cookies.set('deviceAction', 'true', { expires: 1 }); // Expires in 1 day

      // Update state to reflect that the action has been performed
      setActionPerformed(true);
    } else {
      alert('Action already performed by this device.');
    }




  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Maimai Queue</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-primary`">
        <div className="flex-column align-items-center mb-5">
          <img
            src="http://placekitten.com/300/300"
            className="w-50 mb-4"
          />
          <div className="d-flex flex-column align-items-center">
            <p className="text-dark h2">Antrian Pada Hari Ini</p>
            <p className="text-dark h5">Day, DD/MM/YY</p>
          </div>
        </div>
        <div className="px-5">
          <div className="d-flex flex-column w-100 px-4 py-4 ">
            {names.length === 0 ?
              <span>There are no names</span>
              : (names.map((name, index) => (
                <div key={index} className="name-item px-3">
                  <span className="text-black">{name}</span>
                </div>
              )))}
          </div>
        </div>
        <div className="mb-2">
          <button type="button" className="btn btn-success" onClick={handleQueueClick}>Queue</button>
        </div>
        <div className="">
          <button type="button" className="btn btn-danger" onClick={handleRemoveCurPlayer}>Delete</button>
        </div>
        <div>
          <button onClick={performAction} disabled={actionPerformed}>
            Perform Action
          </button>
        </div>
        <Modal isOpen={isModalOpen} onClose={handleQueueClick} onQueue={handleQueue} />
      </main>

      <style jsx>{`
        main {
          background-image:  url("assets/Home.png");
          background-repeat: no-repeat;
          background-size: cover;
          padding: 5rem 1.5rem 5rem 1.5rem;
          flex: 1;
          width: 500px;
          display: flex;
          flex-direction: column;
          div {
            display: flex;
            justify-content: center;
          }
        }
        .name-item {
          padding: 15px 0; 
          background-color: #F9EDD7;
          border-bottom: 1px solid #808080;
        }
        .name-item:first-child {
          border-top-left-radius: 15px;
          border-top-right-radius: 15px;
        }
        .name-item:last-child {
          border-bottom-left-radius: 15px;
          border-bottom-right-radius: 15px;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
            Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
            Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
