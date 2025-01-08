import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

const FaceDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const videoStreamRef = useRef(null); // To store the video stream

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        faceapi.nets.ageGenderNet.loadFromUri("/models"),
      ]);
      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoStreamRef.current = stream; // Save the stream
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Error accessing webcam:", err));
    };

    loadModels();
  }, []);

  useEffect(() => {
    const handleVideoPlay = async () => {
      const video = videoRef.current;
      const canvas = faceapi.createCanvasFromMedia(video);
      document.body.append(canvas);
      canvasRef.current = canvas;

      canvas.style.position = "absolute";
      canvas.style.left = `${video.offsetLeft}px`;
      canvas.style.top = `${video.offsetTop}px`;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const displaySize = { width: video.videoWidth, height: video.videoHeight };
      faceapi.matchDimensions(canvas, displaySize);

      let moodData = [];
      let detectionCount = 0;

      const moodInterval = setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions()
          .withAgeAndGender();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

        if (detections.length > 0) {
          const moodScores = detections[0].expressions;
          moodData.push(moodScores);
          detectionCount++;
        }

        // Stop after 5 seconds (approx. 50 frames)
        if (detectionCount >= 50) {
          clearInterval(moodInterval);
          stopVideoStream(); // Stop the camera
          const averageMood = calculateAverageMood(moodData);
          const age = detections[0]?.age || 25;
          sendMoodToAPI(averageMood, age);
          if (canvas) canvas.remove(); // Remove canvas
        }
      }, 100);
    };

    const stopVideoStream = () => {
      if (videoStreamRef.current) {
        const tracks = videoStreamRef.current.getTracks();
        tracks.forEach((track) => track.stop()); // Stop all tracks
      }
    };

    const calculateAverageMood = (moodData) => {
      const aggregatedMood = moodData.reduce((acc, mood) => {
        for (const [key, value] of Object.entries(mood)) {
          acc[key] = (acc[key] || 0) + value;
        }
        return acc;
      }, {});

      const totalEntries = moodData.length;
      for (const key in aggregatedMood) {
        aggregatedMood[key] /= totalEntries;
      }

      // Return the dominant mood
      return Object.keys(aggregatedMood).reduce((a, b) =>
        aggregatedMood[a] > aggregatedMood[b] ? a : b
      );
    };

    const sendMoodToAPI = async (mood, age) => {
      try {
        // console.log(`Sending mood: ${mood}, Age: ${age}`);
        // const response = await fetch("http://localhost:8080/suggest", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ mood, age }),
        // });
        // const suggestions = await response.json();
        // console.log("Suggestions received:", suggestions);
        console.log("Hello World")
      } catch (error) {
        console.error("Error sending mood to API:", error);
      }
    };

    videoRef.current.addEventListener("play", handleVideoPlay);

    return () => {
      videoRef.current.removeEventListener("play", handleVideoPlay);
    };
  }, []);


  
  return (
    <div className="video-container">
      <video ref={videoRef} width="640" height="480" autoPlay muted />
    </div>
  );
};

export default FaceDetection;
