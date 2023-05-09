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
}
export interface UploadFileApiResponse {
  "AITags": any | null
  "fileId": string
  "filePath": string
  "fileType": string
  "height": number
  "isPrivateFile": boolean
  "name": string
  "size": number
  "tags": string[],
  "thumbnailUrl": string
  "url": string
  "versionInfo": {
      "id": string
      "name": string
  },
  "width": number
}
export default function UploadControl ({ data, updatedItemAway }: { data: FileDTO[], updatedItemAway: Function}) {
  const dropdownTriggerRef = useRef(null)
  const [selectedFolder, setSelectedFolder] = useState<CreateFolderResponse | null>(null)

  const handleSubmit = async () => {
    const items: FileDTO[] = data
    const updatedArray = await Promise.all(
      items.map(async (item, i) => {
        try {
          const itemWithLoading = { ...item, loading: true }
          updatedItemAway({ url: item.url, loading: true })
          let requestData: UploadFileApiRequest | any= {
            fileName: item.name,
            file: item.url
          }
          if (i === 1) {
            requestData = null
          }
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







