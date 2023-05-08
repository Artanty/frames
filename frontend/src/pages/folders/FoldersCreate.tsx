import React, { useRef, useState } from 'react';
import styles from '@styles/pages/folders/folders.scss';
import Icon from '../../components/Icon';
import api from '../../services/api';
import { CreateFolderRequest, CreateFolderResponse } from '@interfaces/api/folder';

export default function FolderCreate({handleAfterSubmit}: any) {
  const [formData, setFormData] = useState({ name: '' });

  const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    api<CreateFolderRequest, CreateFolderResponse>('createFolder', formData)
    .then(res => handleAfterSubmit(res))
    .catch(error => console.error(error));
  }

  return (
    <form className={'fcbh p20 brx8 ' + styles.form} onSubmit={handleSubmit}>
      <div className='frbc'>
        <div className='frsc'>
          <Icon icon='folderAdd' size={70} color='blue'></Icon>
          <div className="fw7 fz14 ml10">Создать папку</div>
        </div>
        <div className="status"></div>
      </div>
      <div className="fcbs py14">
        <div className='frbc w100t'>
          <label className='fz14 fw6 colorgrey' htmlFor='name'>Название</label>
          <input type="text" id='id' name='name' onChange={updateFormData} className={'ml10 p20 brx25 ' + styles.input}/>
        </div>
      </div>
      <div className="frec w100t">
        <button className='fz14 fw6 colorwhite bgblue brx25 br0 p4-15' type="submit">Создать</button>
      </div>
    </form>
  );
}
