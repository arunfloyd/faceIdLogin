import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { checkValidData } from '../utils/validate';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { CameraIcon } from '@heroicons/react/24/outline';
import * as faceapi from 'face-api.js';

const Login = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const email = useRef(null);
    const faceId = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const [modelsLoaded, setModelsLoaded] = useState(false);

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
        if (user?.email !== email?.current?.value) {
            setErrorMessage("Email does not match");
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

        const storedDescriptor = new Float32Array(user.faceDescriptor);
        const distance = faceapi.euclideanDistance(storedDescriptor, detections.descriptor);
        if (distance > 0.6) {
            setErrorMessage('Face ID does not match. Please try again.');
            return;
        }

        navigate('/dashboard');
    }, [modelsLoaded, user, navigate]);

    const retake = () => {
        setImgSrc(null);
    };

    return (
        <div className="bg-cover bg-center h-screen " style={{ backgroundImage: "url('https://res.cloudinary.com/dbl8uexjf/image/upload/v1721288643/wb9n5j1mhawsnkaehx7z.png')" }}>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
            >
                <h1 className="font-bold text-3xl py-4 flex items-center justify-center">Sign In With FaceID</h1>
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
                    <span className='text-lg font-bold'>Disclaimer:</span> Ensure your head is properly aligned within the square and the lighting is sufficient before capturing.
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
                <a href='/'> <p className="p-2 my-2 bg-red-800 w-full rounded-lg flex items-center justify-center">New to the Town? Sign Up</p></a>
            </form>
        </div>
    );
}

export default Login;
