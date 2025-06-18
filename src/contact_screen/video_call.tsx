import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  MdCallEnd,         // End Call (central, red)
  MdMic,             // Mic On
  MdMicOff,          // Mic Off
  MdVideocam,        // Camera On
  MdVideocamOff,     // Camera Off
  MdFlipCameraIos,   // Flip Camera
  MdOutlineChatBubbleOutline, // Message/Chat icon
  MdKeyboardArrowDown // Back/Minimize (top left)
} from 'react-icons/md';
import { BsArrowsAngleExpand } from 'react-icons/bs'; // Expand (top right)
import { useNavigate } from 'react-router-dom';

interface VideoCallPageProps {}

const VideoCallPage: React.FC<VideoCallPageProps> = () => {
  const navigate = useNavigate();
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const smallVideoRef = useRef<HTMLVideoElement>(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Dummy Contact Info
  const currentContact = {
    id: 'jeff-johnson',
    name: 'Jeff Johnson',
    avatar: 'https://via.placeholder.com/40/D1E9E9/9FC1C1?text=JJ'
  };
  const remoteUserName = "User 2"; // Placeholder name for the main video (if it's remote) or local's full screen.

  // Fullscreen API Handlers
  const handleFullScreenChange = useCallback(() => {
    setIsFullScreen(document.fullscreenElement != null);
  }, []);

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, [handleFullScreenChange]);

  const toggleFullScreen = () => {
    if (mainVideoRef.current) {
      if (!document.fullscreenElement) {
        mainVideoRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  const stopStream = useCallback((stream: MediaStream | null) => {
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
        console.log(`Track stopped: ${track.kind} - ${track.id}`);
      });
      console.log('All media tracks from the stream have been stopped.');
    } else {
      console.log('No stream to stop.');
    }
  }, []);

  useEffect(() => {
    const getMedia = async () => {
      try {
        setPermissionError(null);
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);

        if (smallVideoRef.current) {
          smallVideoRef.current.srcObject = stream;
        }
        if (mainVideoRef.current) {
            mainVideoRef.current.srcObject = stream;
        }
        console.log('Media stream obtained successfully.');
      } catch (error) {
        console.error('Error accessing media devices:', error);
        if (error instanceof DOMException) {
          if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
            setPermissionError('Camera and/or microphone access denied. Please grant permissions.');
          } else if (error.name === 'NotFoundError') {
            setPermissionError('No camera or microphone found.');
          } else {
            setPermissionError(`Error: ${error.message}`);
          }
        } else {
          setPermissionError('An unknown error occurred while accessing media devices.');
        }
        stopStream(localStream);
        setLocalStream(null);
      }
    };

    getMedia();

    return () => {
      console.log('VideoCallPage unmounting. Stopping stream...');
      stopStream(localStream);
    };
  }, []);

  const toggleMute = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      if (audioTracks.length > 0) {
        audioTracks.forEach(track => (track.enabled = !track.enabled));
        setIsMuted(!isMuted);
      } else {
        console.warn("No audio tracks found to mute/unmute.");
      }
    } else {
      console.warn("Cannot toggle mute: localStream is null.");
    }
  };

  const toggleCamera = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      if (videoTracks.length > 0) {
        videoTracks.forEach(track => (track.enabled = !track.enabled));
        setIsCameraOff(!isCameraOff);
      } else {
        console.warn("No video tracks found to toggle camera.");
      }
    } else {
      console.warn("Cannot toggle camera: localStream is null.");
    }
  };

  const toggleFlipCamera = () => {
      // In a real application, this would switch between front and back cameras
      console.log("Flip camera not implemented yet.");
      alert("Flip camera functionality is not implemented in this demo.");
  };

  const handleEndCall = () => {
    console.log('Ending call...');
    stopStream(localStream);
    setLocalStream(null);
    navigate(-1);
  };

  const handleChatButtonClick = () => {
    stopStream(localStream);
    setLocalStream(null);

    navigate(`/messages/${currentContact.id}`, {
      state: { fromCall: true, message: `📞 Call with ${currentContact.name} ended.` }
    });
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col">

      {/* Main Video Area - Covers the whole background */}
      <div className="absolute inset-0">
        <video
          ref={mainVideoRef}
          autoPlay
          playsInline
          muted={true}
          className={`w-full h-full object-cover transition-opacity duration-300 ${!localStream && !permissionError ? 'opacity-0' : 'opacity-100'}`}
        />
        {/* Fallback image if no stream, camera off, or permission error */}
        {((!localStream && !permissionError) || isCameraOff || permissionError) && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
             {permissionError ? (
                <p className="text-red-400 text-center p-4 text-xl font-bold">{permissionError}</p>
             ) : (
                <>
                  <img
                    src="https://via.placeholder.com/1080x1920/8098ff/ffffff?text=Video+Off"
                    alt="Video Off"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                  />
                  <span className="relative z-10 text-white text-3xl font-bold">{remoteUserName}</span>
                </>
             )}
          </div>
        )}
      </div>

      {/* Small Overlay Video (Local user's camera feed) - Top Right */}
      {localStream && !permissionError && (
        <div className="absolute top-4 right-4 w-32 h-48 rounded-lg overflow-hidden border-2 border-white shadow-lg bg-gray-800 z-30">
          <video
            ref={smallVideoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${isCameraOff ? 'hidden' : 'block'}`}
          />
          {isCameraOff && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-400">
              <MdVideocamOff size={30} className="text-red-400" />
            </div>
          )}
        </div>
      )}

      {/* Top Left Bar with Back, Time, and Expand */}
      <div className="absolute top-0 left-0 right-0 p-4 pt-6 flex items-center justify-between z-20">
        <button onClick={handleEndCall} className="w-11 h-11 rounded-full flex items-center justify-center
            bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-200 active:scale-90">
          <MdKeyboardArrowDown size={30} className="rotate-90" />
        </button>

        <span className="text-white text-lg font-semibold flex-grow text-center ml-auto">
            00:15
        </span>

        <button onClick={toggleFullScreen} className="w-11 h-11 rounded-full flex items-center justify-center
            bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-200 active:scale-90 ml-auto">
            <BsArrowsAngleExpand size={22} className="text-white" />
        </button>
      </div>

      {/* Bottom Icon Bar - Recreated based on the new image */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm h-16
            bg-white/10 backdrop-blur-md rounded-full flex justify-around items-center px-4 z-20">
        {/* Mute */}
        <button
          onClick={toggleMute}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90
            ${isMuted ? 'bg-red-500' : 'bg-transparent'}`} 
        >
          {isMuted ? <MdMicOff size={28} className="text-white" /> : <MdMic size={28} className="text-white" />}
        </button>

        {/* End Call (Red circle) */}
        <button
          onClick={handleEndCall}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90"
        >
          <MdCallEnd size={32} className="text-white" />
        </button>

        {/* Camera Off/On */}
        <button
          onClick={toggleCamera}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90
            ${isCameraOff ? 'bg-red-500' : 'bg-transparent'}`}
        >
          {isCameraOff ? <MdVideocamOff size={28} className="text-white" /> : <MdVideocam size={28} className="text-white" />}
        </button>

        {/* Flip Camera */}
        <button
          onClick={toggleFlipCamera}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 bg-transparent"
        >
          <MdFlipCameraIos size={28} className="text-white" />
        </button>

        {/* Message/Chat Icon (Replaced the plus icon) */}
        <button
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 bg-transparent"
          onClick={handleChatButtonClick}
        >
            <MdOutlineChatBubbleOutline size={28} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default VideoCallPage;