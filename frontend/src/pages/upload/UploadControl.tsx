import React, { ChangeEventHandler, useRef, useEffect, useState } from 'react';
import styles2 from '@styles/components/dropdown.scss';
import styles from '@styles/pages/upload.scss';
import Icon from '@components/Icon'
import { NavLink, useNavigate } from 'react-router-dom';
import useComponentVisible from '@services/helpers';
import { AuthContext } from '@routeProviders/auth';
import { CreateFolderResponse } from '@interfaces/api/folder';
import api from '@services/api';
import Loader from '@components/Loader';
import { FileDTO } from '@components/Dropzone';
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
export default function UploadControl({ data }: { data: FileDTO[]}) {
  const dropdownTriggerRef = useRef(null)
  const [selectedFolder, setSelectedFolder] = useState<CreateFolderResponse | null>(null)
  
  const handleSubmit = () => {
    console.log(data)
    console.log(selectedFolder)
    const requestData: UploadFileApiRequest = {
      fileName: data?.[0]?.name,
      file: data?.[0]?.url
    }
    fetch('https://cs99850.tmweb.ru/upload_file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then((data: UploadFileApiResponse) => {
      console.log(data)
      // Handle response data
    })
    .catch(error => {
      // Handle errors
    })
  }

  // const uploadFiles = async () => {
  //   // setLoading(true)
  //   await api<null, CreateFolderResponse[]>('getFolders', null).then(data => {
  //     // setFolders(data)
  //     // setLoading(false)
  //     console.log(data)
  //   })
  // }

  const handleSelectFolder = (nextSelectedFolder: CreateFolderResponse) => {
    setSelectedFolder(selectedFolder => nextSelectedFolder)
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

function Dropdown ({triggerRef, selectFolderAway}: {triggerRef?: React.MutableRefObject<null>, selectFolderAway: Function}) {
  const [folders, setFolders] = useState<CreateFolderResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const dropdownRef = useRef(null)

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  }

  const getFolders = () => {
    setLoading(true)
    api<null, CreateFolderResponse[]>('getFolders', null).then(data => {
      setFolders(data)
      setLoading(false)
    })
  }

  const selectOption = (e: any | React.ChangeEvent<HTMLElement>) => {
    const id = e.target.getAttribute("data-id")
    const item = folders.find((el: CreateFolderResponse) => el.id === Number(id))
    selectFolderAway(item)
    setSelectedOption(id)
    setIsOpen(false);
  }

  useEffect (() => {
    getFolders() 
  },[])

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if ((dropdownRef.current && !(dropdownRef as any).current.contains(event.target)) &&
          (triggerRef?.current && !(triggerRef as any).current.contains(event.target))
      ) {
        setIsOpen(false);
      }
    };
    if (triggerRef?.current){
      (triggerRef.current as any).addEventListener("click", handleButtonClick)
    }
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      if (triggerRef?.current){
        (triggerRef.current as any).removeEventListener("click", handleButtonClick)
      }
    };
  }, [dropdownRef]);
  
  return (
    <div ref={dropdownRef} className={' ' + styles2.wrapper}>
      <div onClick={handleButtonClick}>
      <Icon icon='chevronDown' size={80}></Icon>
      </div>
      {isOpen && (
        <ul className={' ' + styles2.options}>
          <div className={'w100t fcsh mt10 '}>
            <Loader visible={loading} block={true} noBg={true}></Loader>
              {folders?.map((el: CreateFolderResponse, i: number) => (
                <li key={i} className={' ' + styles2.option} data-id={el.id} onClick={selectOption}>
                  <span className={'tovfl ' + styles2.optionLink} data-id={el.id}>{el.name}</span>
                </li>
              ))}     
          </div>
        </ul>
      )}
    </div>
  );

}





