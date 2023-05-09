import React, { useState, useEffect } from 'react';
import styles from '@styles/pages/folders/folders.scss';
import api from '@services/api';
import FolderListItem, { updateFolderDTO } from './FolderListItem';
import { CreateFolderResponse } from '@interfaces/api/folder'
import Loader from '@components/Loader';


export default function FolderList() {
  const [folders, setFolders] = useState<CreateFolderResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const tryPy = () => {
    fetch('https://cs99850.tmweb.ru/upload_file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Access-Control-Allow-Headers': 'Content-Type',
        Authorization: 'Bearer ' + localStorage.getItem('token') || ''
      },
      body: null
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      // Handle response data
    })
    .catch(error => {
      // Handle errors
    });
  }

  const handleUpdateListItem = (updatedItem: updateFolderDTO) => {
    const newFolders: CreateFolderResponse[] = JSON.parse(JSON.stringify(folders)).map((el: CreateFolderResponse | any) => {
      if (el.id === updatedItem.id) {
        el = { ...el, [updatedItem.name]: updatedItem.value }
      }
      return el
    })  
    setFolders(newFolders)
  }

  const getFolders = () => {
    setLoading(true)
    api<null, CreateFolderResponse[]>('getFolders', null).then(data => {
      setFolders(data)
      setLoading(false)
    })
  }

  useEffect (() => {
    getFolders() 
  },[])

  return (
    <div className={'w100t fcsh mt20 ' + styles.wrapper}>
      <Loader visible={loading} block={true}></Loader>
      {folders?.map((el: CreateFolderResponse) => (
          <div key={el.id} className='mb10'>
            <FolderListItem item={el} itemUpdateAway={handleUpdateListItem}></FolderListItem>
          </div>
        ))}     
    </div>
  );
}
