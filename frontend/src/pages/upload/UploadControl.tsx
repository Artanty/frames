import React, { ChangeEventHandler, useRef, useEffect, useState } from 'react';

import styles from '@styles/pages/upload.scss';
import Icon from '@components/Icon'
import { NavLink, useNavigate } from 'react-router-dom';
import useComponentVisible from '@services/helpers';
import { AuthContext } from '@routeProviders/auth';
import { CreateFolderResponse } from '@interfaces/api/folder';
import api from '@services/api';
import Loader from '@components/Loader';
import { FileDTO } from '@pages/upload/Dropzone';
import Dropdown from './Dropdown';
export interface UploadFileApiRequest {
  "fileName": string
  "file": string
  folder: string
}
export interface UploadFileApiResponse {
  "fileId": string
  "fileType": string
  "name": string
  "url": string
  "thumbnailUrl": string
  "size": number
  "width": number
  "height": number
  "isPrivateFile": boolean
  "tags": string[],
  "versionInfo": {
      "id": string
      "name": string
  },
  "AITags": any | null
  "filePath": string
}
export interface UploadFileDataApiRequest {
  fileId: string
  fileType: string
  fileName: string
  fileUrl: string
  thumbnailUrl: string
  size: number
  width: number
  height: number
  tags: string
  isPrivateFile: boolean
  folderId: number | null
}

export default function UploadControl ({ data, updatedItemAway }: { data: FileDTO[], updatedItemAway: Function}) {
  const auth = React.useContext(AuthContext);
  const dropdownTriggerRef = useRef(null)
  const [selectedFolder, setSelectedFolder] = useState<CreateFolderResponse | null>(null)
  
  const buildFolderPath = (folder?: CreateFolderResponse) => {
    if (auth?.user?.id) {
      if (folder) {
        const folderName = (folder?.name && typeof folder.name === 'string') ? folder.name.trim().replace(/ /g, '_') : ''
        return '/frames/usr_' + auth.user.id + '/' + folderName
      } else {
        return '/frames/usr_' + auth.user.id
      }
     
    }
    return '/unknown'
  }
  const handleSubmit = async () => {
    const items: FileDTO[] = data
    const updatedArray = await Promise.all(
      items.map(async (item, i) => {
        try {
          const itemWithLoading = { ...item, loading: true }
          updatedItemAway({ url: item.url, loading: true })
          let requestData: UploadFileApiRequest | any= {
            fileName: item.name,
            file: item.url,
            folder: buildFolderPath(item.folder)
          }
          // if (i === 1) {
          //   requestData = null
          // }
          const response = await fetch(`https://cs99850.tmweb.ru/upload_file`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'accept': '*/*',
              'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify(requestData)
          })
          const result = await response.json()
          const itemWithResult = { ...itemWithLoading, fileId: result.fileId, loading: false }
          updatedItemAway({ url: item.url, fileId: result.fileId, loading: false })
          // saveFileData(result, item.folder)
          return itemWithResult
        } catch (error) {
          const itemWithError = { ...item, error: error.message, loading: false }
          updatedItemAway({ url: item.url, error: error.message, loading: false })
          return itemWithError
        } 
      })
    )
    console.log(updatedArray)
  }

  const saveFileData = (savedFile: UploadFileApiResponse, folder?: CreateFolderResponse) => {
    
    const requestData: UploadFileDataApiRequest = {
      fileId: savedFile.fileId,
      fileType: savedFile.fileType,
      fileName: savedFile.name,
      fileUrl: savedFile.url,
      thumbnailUrl: savedFile.thumbnailUrl,
      size: savedFile.size,
      width: savedFile.width,
      height: savedFile.height,
      tags: savedFile.tags?.join(','),
      isPrivateFile: savedFile.isPrivateFile,
      folderId: folder?.id || null
    }
    api<UploadFileDataApiRequest, CreateFolderResponse>('createFileData', requestData)
      .then(res => console.log(res))
      .catch(error => console.error(error));
  }

  const handleSelectFolder = (nextSelectedFolder: CreateFolderResponse) => {
    setSelectedFolder(selectedFolder => nextSelectedFolder)
    updatedItemAway({ url: null, folder: nextSelectedFolder })
  }

  return (
    <div className={'fcbh p20 brx8 w200 ' + styles.controls}>
      <div className='frbc w100t'>
        <Icon icon='folderAdd' size={70} color='blue'></Icon>
        <div ref={dropdownTriggerRef} className={"tovfl fw7 fz14 ml10 crs " + (selectedFolder ? '' : 'colorred')}>{selectedFolder ? selectedFolder?.name : 'Не выбрана'}</div>
        <Dropdown selectFolderAway={handleSelectFolder} triggerRef={dropdownTriggerRef}></Dropdown>
      </div>
      <div className="frec py14">
        <button className='crs fz14 fw6 colorwhite bgblue brx25 br0 p4-15 frbc' 
          disabled={selectedFolder === null || data?.length === 0} onClick={handleSubmit}>
            <Icon icon='upload' size={70} color='white'></Icon>Загрузить
            {' ' + (data?.length > 0 ? data.length : '')}
          </button>
      </div>
    </div>
  );
}







