// components/Modal.js
import React from "react";
import styles from "./video.css";
import { IoMdClose } from "react-icons/io";

const VideoModal = ({ isOpen, onClose, data }) => {
  console.log(data);

  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <span className="closeButton " onClick={onClose}>
          <IoMdClose className="bg-white rounded-sm w-10" />
        </span>
        <iframe
          className="w-full my-5 md:h-96 md:w-[100%]"
          src={data}
          title="YouTube video player"
          framerborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoModal;
