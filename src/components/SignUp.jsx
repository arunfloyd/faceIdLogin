import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { Link, useNavigate } from "react-router-dom";
import * as faceapi from 'face-api.js';
import Webcam from 'react-webcam';
import { CameraIcon } from '@heroicons/react/24/outline';
import { checkValidData } from '../utils/validate';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const email = useRef(null);
    const username = useRef(null);
    const faceId = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [faceDescriptor, setFaceDescriptor] = useState(null);

    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = 'https://justadudewhohacks.github.io/face-api.js/models';
            await Promise.all([
                faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
            ]);
            setModelsLoaded(true);
        };
        loadModels();
    }, []);

    const capture = useCallback(async () => {
        if (!modelsLoaded) {
            setErrorMessage('Face detection models are still loading. Please wait.');
            return;
        }
        const imageSrc = faceId.current.getScreenshot();
        const img = await faceapi.fetchImage(imageSrc);
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        if (!detections) {
            setErrorMessage('No face detected. Please try again.');
            return;
        }
        setImgSrc(imageSrc);
        setFaceDescriptor(detections.descriptor);
        setErrorMessage("");
    }, [modelsLoaded]);

    const retake = () => {
        setImgSrc(null);
    };

    const handleSignUp = () => {
        const message = checkValidData(email.current.value, username.current.value);
        setErrorMessage(message);
        if (!imgSrc) setErrorMessage("Add Your Face Id");
        if (message) return;

        dispatch(addUser({
            username: username.current.value,
            email: email.current.value,
            faceId: imgSrc,
            faceDescriptor: Array.from(faceDescriptor)
        }));
        navigate('/login');
    };

    return (
        <div className="bg-cover bg-center h-screen" style={{ backgroundImage: "url('https://res.cloudinary.com/dbl8uexjf/image/upload/v1721288643/wb9n5j1mhawsnkaehx7z.png')" }}>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
            >
                <h1 className="font-bold text-3xl py-4 flex items-center justify-center">Sign Up With FaceID</h1>
                <input
                    ref={username}
                    type="text"
                    placeholder="Enter Name"
                    className="p-4 my-4 w-full bg-gray-700 bg-opacity-50"
                />
                <input
                    ref={email}
                    type="email"
                    placeholder="Email Address"
                    className="p-4 my-4 w-full bg-gray-700 bg-opacity-50"
                />
                <div className="relative">
                    {imgSrc ? (
                        <img src={imgSrc} alt='webcam' />
                    ) : (
                        <div className="relative">
                            <Webcam
                                height={600}
                                width={600}
                                ref={faceId}
                                className="w-full"
                            />
                            <div
                                className="absolute border-4 border-blue-500 rounded-lg"
                                style={{
                                    top: '25%',
                                    left: '25%',
                                    width: '40%',
                                    height: '50%',
                                    zIndex: 1,
                                }}
                            />

                        </div>
                    )}
                </div>
                <p className="text-center text-sm text-gray-300 mt-4">
                    <span className='text-lg font-bold '>Disclaimer :</span> Ensure your head is properly aligned within the square and the lighting is sufficient before capturing.
                </p>

                <div className="flex items-center justify-center py-3">
                    {imgSrc ? (
                        <button
                            onClick={retake}
                            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                        >
                            <CameraIcon className="h-5 w-5 mr-2" />
                            Retake
                        </button>
                    ) : (
                        <button
                            onClick={capture}
                            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                        >
                            <CameraIcon className="h-5 w-5 mr-2" />
                            Capture
                        </button>
                    )}
                </div>
                <p className="text-red-600 font-bold text-lg">{errorMessage}</p>
                <button
                    className="p-4 my-6 bg-red-800 w-full rounded-lg"
                    onClick={handleSignUp}
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;
