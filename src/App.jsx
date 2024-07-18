// import React, { useEffect, useRef, useState } from 'react';
// import Webcam from 'react-webcam';
// import * as faceapi from 'face-api.js';



// const App = () => {
//   const webcamRef = useRef(null);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [modelsLoaded, setModelsLoaded] = useState(false);
//   const [photoName, setPhotoName] = useState('');
//   const [capturedPhotos, setCapturedPhotos] = useState([]);
//   const [matchedName, setMatchedName] = useState('');

//   const loadModels = async () => {
//     const MODEL_URL = 'https://justadudewhohacks.github.io/face-api.js/models';
//     try {
//       await Promise.all([
//         faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
//         faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
//         faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
//       ]);
//       setModelsLoaded(true);
//       console.log('Models loaded successfully');
//     } catch (error) {
//       console.error('Error loading models:', error);
//       setErrorMessage('Failed to load face detection models. Please try again later.');
//     }
//   };

//   useEffect(() => {
//     loadModels();
//   }, []);

//   const capture = async () => {
//     if (!modelsLoaded) {
//       setErrorMessage('Face detection models are still loading. Please wait.');
//       return;
//     }

//     const imageSrc = webcamRef.current.getScreenshot();
//     const img = await faceapi.fetchImage(imageSrc);

//     const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();

//     if (detections.length === 0) {
//       setErrorMessage('No face detected. Please try again.');
//       return;
//     }

//     const faceDescriptor = detections[0].descriptor;
//     const newPhoto = { name: photoName, descriptor: faceDescriptor, src: imageSrc };
//     setCapturedPhotos((prevPhotos) => [...prevPhotos, newPhoto]);

//     // Check if the newly captured photo matches any saved photo
//     for (let photo of capturedPhotos) {
//       const distance = faceapi.euclideanDistance(photo.descriptor, faceDescriptor);
//       if (distance < 0.6) {
//         setMatchedName(photo.name);
//         break;
//       }
//     }

//     setPhotoName('');
//   };

//   const handlePhotoNameChange = (event) => {
//     setPhotoName(event.target.value);
//   };

//   return (
//     <div>
//       {!modelsLoaded && <p>Loading face detection models...</p>}
//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//       />
//       <input
//         type="text"
//         value={photoName}
//         onChange={handlePhotoNameChange}
//         placeholder="Enter name for photo"
//       />
//       <button onClick={capture} disabled={!modelsLoaded || !photoName}>
//         Capture
//       </button>
//       {errorMessage && <p>{errorMessage}</p>}
//       {matchedName && <div className="dialog">Matched Name: {matchedName}</div>}
//       <div>
//         <h3>Captured Photos:</h3>
//         <ul>
//           {capturedPhotos.map((photo, index) => (
//             <li key={index}>{photo.name}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default App;


import { Provider } from "react-redux";
import Body from "./components/Body";
import appStore from "./utils/appStore";

function App() {
  return (
    <Provider store={appStore}>
      <Body />

    </Provider>
  )
}
export default App