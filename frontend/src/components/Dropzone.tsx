import React, { useEffect, useRef, useState } from "react";
import styles from '@styles/components/dropzone.scss'
import Masonry from "./Masonry";
import Icon from "./Icon";
import UploadControl from "@pages/upload/UploadControl";
export type FileDTO = File & { url: string}
export default function Dropzone() {
  const [previewImages, setPreviewImages] = useState<any[]>([]);
  const [uploadedImage, setUploadedImage] = useState("");
  const [files, setFiles] = useState<any[]>([]);

  const handleFileUpload = (event: any) => {
    const uploadedFiles = [...event.target.files];
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };
  // function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const [selectedFiles, setSelectedFiles] = useState<FileDTO[]>([])
    const [drag, setDrag] = useState<boolean>(false);

    const handleFiles = (files: FileList) => {
      const filesArr = [...files]
      // setSelectedFiles([...selectedFiles, ...filesArr]);
      console.log(selectedFiles)
    };

    const handleSubmit = (event: any) => {
      event.preventDefault();
      console.log(selectedFiles);
    };
    let dropArea: any

    const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
      setDrag(true)
      // console.log(e)
    }
    const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
      // console.log(e)
      setDrag(false)
    }

    function handleDrop (e: React.DragEvent<HTMLElement>) {
      e.preventDefault()
      setDrag(false)
      const files: FileList = e.dataTransfer.files;
      if (files.length > 0) {
        handleFiles(files);
      }
      // dropArea.classList.remove("dragover");
      
    }

    function addUrlToFiles(files: FileList): Promise<File[]> {
      const promises: Promise<File>[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const promise = new Promise<File>((resolve, reject) => {
          const reader = new FileReader(); 
          reader.onload = () => {
            const fileWithUrl = Object.assign(file, { url: reader.result });
            resolve(fileWithUrl);
          };
          reader.onerror = () => {
            reject(reader.error);
          };
          reader.readAsDataURL(file);
        });
        promises.push(promise);
      }
      return Promise.all(promises);
    }

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;
      addUrlToFiles(files).then((newSelectedFiles: any) => {
        console.log(newSelectedFiles)
        setSelectedFiles((selectedFiles) => [...selectedFiles, ...newSelectedFiles]);
      }) 
    };

    return ( 
      <>
      <div className={drag ? styles.uploadArea + ' ' + styles.uploadArea__drag : styles.uploadArea}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
        <label htmlFor="fileInput" className={styles.uploadLabel}>
          Переместите файлы или нажмите, чтобы выбрать
        </label>
        <input 
          id='fileInput'
          type="file" 
          onChange={handleFileInputChange} 
          multiple 
          className={styles.fileInput}
        />
          <UploadControl data={selectedFiles}></UploadControl>
      </div>
      <div className="w100t pt20">
        {selectedFiles?.length > 0 && <Masonry data={selectedFiles}></Masonry>}
      </div>
    </>
    );
}