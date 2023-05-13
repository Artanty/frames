import React, { useEffect, useRef, useState } from "react";
import styles from '@styles/components/dropzone.scss'
import Masonry from "@pages/upload/Masonry";
import Icon from "@components/Icon";
import UploadControl from "@pages/upload/UploadControl";
import { CreateFolderResponse } from "@interfaces/api/folder";
import { jsps } from "@services/helpers";
export type FileDTO = { 
  url: string
  folder?: CreateFolderResponse
  removed?: boolean
  width?: number
  height?: number
  loading?: boolean
  fileId?: string
  error?: string
  name: string
}
export default function Dropzone() {
  const [previewImages, setPreviewImages] = useState<any[]>([]);
  const [uploadedImage, setUploadedImage] = useState("");
  const [files, setFiles] = useState<any[]>([]);
  const [tempFilesWithLoadStatus, setTempFilesWithLoadStatus] = useState<FileDTO[]>([])
  const handleFileUpload = (event: any) => {
    const uploadedFiles = [...event.target.files];
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };
  // function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const [selectedFiles, setSelectedFiles] = useState<FileDTO[]>([])
    const [drag, setDrag] = useState<boolean>(false);

    const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
      setDrag(true)
    }

    const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
      setDrag(false)
    }

    function handleDrop (e: React.DragEvent<HTMLElement>) {
      e.preventDefault()
      setDrag(false)
      const files: FileList = e.dataTransfer.files;
      if (!files) return;
      addUrlToFiles(files).then((newSelectedFiles: any) => {
        setSelectedFiles((selectedFiles) => [...selectedFiles, ...newSelectedFiles]);
      })
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
      addUrlToFiles(files).then((res: File[]) => {
        const newSelectedFiles: FileDTO[] = res.map((el: File & FileDTO) => {
          return { name: el.name, url: el.url }
        })
        setSelectedFiles((selectedFiles) => [...selectedFiles, ...newSelectedFiles]);
      }) 
    }

    const handleUpdateSelectedFiles = () => {
      let newSelectedFiles = [...selectedFiles] 
      newSelectedFiles = newSelectedFiles.filter((el: FileDTO) => !el.removed)
      setSelectedFiles((selectedFiles) => newSelectedFiles);
    }

    const handleUpdatedItem = (updatedItem: Partial<FileDTO>) => {
      const updateProcess = (file: FileDTO) => {
        if ('loading' in updatedItem){
          file.loading = updatedItem.loading
        }
        if ('fileId' in updatedItem) {
          file.fileId = updatedItem.fileId
        }
        if ('error' in updatedItem) {
          file.error = updatedItem.error
        }
        if ('folder' in updatedItem) {
          file.folder = updatedItem.folder
        }
        return file
      }
      let newSelectedFiles = selectedFiles.map((file: FileDTO) => {
        if (updatedItem.url === null) { // todo think how better
          updateProcess(file)
        } else if (file.url === updatedItem.url) {
          updateProcess(file)
        }
        return file
      })
      if (updatedItem.url === null) {
        newSelectedFiles = jsps(newSelectedFiles)
      }
      setSelectedFiles((selectedFiles) => newSelectedFiles);
    }

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
          <UploadControl data={selectedFiles} updatedItemAway={handleUpdatedItem}></UploadControl>
      </div>
      <div className="w100t pt20">
        {selectedFiles?.length > 0 && <Masonry data={selectedFiles} updateDataAway={handleUpdateSelectedFiles}></Masonry>}
      </div>
    </>
    );
}
