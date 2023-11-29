import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { db } from './server/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ChatContainer from './routes/ChatContainer';
import { ChakraProvider } from '@chakra-ui/react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ChatContainer />
  }
]);

const App = () => {
  useEffect(() => {
    addDoc(collection(db, "chats"), {
      hello: "world"
    });
  }, []); 

  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
