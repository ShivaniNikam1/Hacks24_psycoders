import React, { useState, useEffect } from "react";
import "./Chat.css"
// import { db } from "../firebase-config";
// import {
//   onSnapshot,
//   orderBy,
//   query,
//   collection,
//   addDoc,
//   serverTimestamp,
// } from "firebase/firestore";
// import { useRecoilState } from "recoil";
// import { userState } from "../atom/useratom";

// function Chat() {
//   const [currentUser] = useRecoilState(userState);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   useEffect(() => {
//     const q = query(collection(db, "messages"), orderBy("timestamp"));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       setMessages(
//         snapshot.docs.map((doc) => ({
//           id: doc.id,
//           data: doc.data(),
//         }))
//       );
//     });
//     return unsubscribe;
//   }, []);

//   const sendMessage = async () => {
//     if (newMessage.trim() === "") return;

//     try {
//       // Add the new message to the "messages" collection
//       const messageRef = collection(db, "messages");
//       await addDoc(messageRef, {
//         text: newMessage,
//         uid: currentUser.userid, // Use the user's ID for identification
//         photoURL: currentUser.photoURL, // Assuming you have photoURL in userState
//         timestamp: serverTimestamp(),
//       });

//       // Clear the input field after sending the message
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <div className="flex justify-center bg-gray-800 py-10 min-h-screen">
//       {currentUser ? (
//         <div>
//           <div>Logged in as {currentUser.email}</div>
//           <input
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//           />
//           <button
//             className="bg-white rounded-[10px] hover:bg-blue-400 p-3"
//             onClick={sendMessage}
//           >
//             Send Message
//           </button>

//           <div className="flex flex-col gap-5">
//             {messages.map((msg) => (
//               <div
//                 key={msg.id}
//                 className={`message flex ${
//                   msg.data.uid === currentUser.userid
//                     ? "justify-end"
//                     : "justify-start  "
//                 }`}
//               >
//                 <div
//                   className={`message flex flex-row p-3 gap-3 rounded-[20px] items-center ${
//                     msg.data.uid === currentUser.userid
//                       ? " text-white bg-blue-500"
//                       : " bg-white "
//                   }`}
//                 >
//                   <img
//                     className="w-10 h-10 rounded-full"
//                     src={msg.data.photoURL}
//                     alt="User Avatar"
//                   />
//                   {msg.data.text}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <p>User not authenticated.</p>
//       )}
//     </div>
//   );
// }

// export default Chat;import React, { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  doc,
  setDoc,
  getFirestore,
  getDoc,
  onSnapshot,
  collection,
  addDoc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { auth, app } from "../firebase-config"; // Adjust the path accordingly
import { onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged

// import "./App.css";
const db = getFirestore(app);

function App() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const sendMessage = async () => {
    await addDoc(collection(db, "messages"), {
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
      text: newMessage,
      timestamp: serverTimestamp(),
    });

    setNewMessage("");
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      // Handle the authentication result as needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center bg-gray-800 py-10 min-h-screen">
      {user ? (
        <div>
          <div> Logged in as {user.displayName}</div>
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className=" bg-white rounded-[10px] hover:bg-blue-400 p-3"
            onClick={sendMessage}
          >
            Send Message
          </button>
          {/* <button
            className="mb-8 bg-white rounded-[10px] p-3"
            onClick={() => auth.signOut()}
          >
            Logout
          </button> */}

          <div className="flex flex-col gap-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message flex ${
                  msg.data.uid === user.uid ? "justify-end" : "justify-start  "
                }`}
              >
                <div
                  className={`message flex flex-row p-3 gap-3 rounded-[20px] items-center ${
                    msg.data.uid === user.uid
                      ? " text-white bg-blue-500"
                      : " bg-white "
                  }`}
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={msg.data.photoURL}
                  />
                  {msg.data.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <button onClick={handleGoogleLogin}>Login with Google</button>
      )}
    </div>
  );
}

export default App;

