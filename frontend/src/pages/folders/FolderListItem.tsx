import React, { ChangeEvent, MouseEventHandler, useEffect, useRef, useState } from 'react';
import styles from '@styles/pages/folders/folders.scss';
import Icon from '../../components/Icon';
import { CreateFolderResponse, UpdateFolderRequest } from '@interfaces/api/folder';
import api from '@services/api';
import { jsps, upd } from '@services/helpers';

export interface updateFolderDTO {
  id: number
  name: keyof CreateFolderResponse
  value: string
}
export default function FolderListItem (props: { item: CreateFolderResponse, itemUpdateAway: Function}) {
  const [savedItem, setSavedItem] = useState<CreateFolderResponse | null>(null)
  const [updatedItem, setUpdatedItem] = useState<CreateFolderResponse | null>(null)
  const [timer, setTimer] = useState<number | undefined>(undefined)

  const updateItemApi = async (item: CreateFolderResponse) => {
    const requestData = {
      id: item.id,
      name: item.name
    }
    await api<UpdateFolderRequest,CreateFolderResponse>('updateFolder', requestData)
    .then(res => {
      console.log(res)
    })
  }

  const allowApiSave = (prevState: CreateFolderResponse | null, nextState: CreateFolderResponse | null): boolean => {
    const propsToCompare: (keyof CreateFolderResponse)[] = ['name']
    let result = false
    try {
      if (prevState !== null && nextState !== null) {
        propsToCompare.forEach((key: keyof CreateFolderResponse) => {
          if(key in prevState) {
            if (JSON.parse(JSON.stringify(nextState[key])) !== JSON.parse(JSON.stringify(prevState[key]))) {
              result = true
            }
          } else {
            throw new Error('Неизвестное свойство обновленного объекта')
          }
        })
      }
    } catch (e) {
      console.log(e)
    }
    return result
  }

  const updateItem = (id: number, name: keyof CreateFolderResponse, e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value
    const nextState = upd(savedItem, name, newValue)
    setUpdatedItem(prevState => nextState)
    const data: updateFolderDTO = { id: id, name: name, value: newValue}
    props.itemUpdateAway(data)
    const updatedItem = JSON.parse(JSON.stringify(props.item))
    updatedItem[name] = newValue
  }

  React.useEffect(() => {
    setSavedItem(prevState => jsps(props.item))
  }, [])

  React.useEffect(() => {
    if (timer) {
      clearTimeout(timer)
    }
    if (allowApiSave(savedItem, updatedItem)){
      const newTimer = setTimeout(() => {
        if(allowApiSave(savedItem, updatedItem)){
          updatedItem && updateItemApi(updatedItem)
          
        }
      }, 2000)
      setTimer(prevState => newTimer)
    }
    
    return () => {
      clearTimeout(timer)
      setTimer(prevState => undefined)
    }
}, [updatedItem])

  return (
    <div className={'fcbh p20 brx8 ' + styles.form}>
      <div className='frbc'>
        <div className='frsc'>
          <Icon icon='folderAdd' size={70} color='blue'></Icon>
          <div className="fw7 fz14 ml10">Папка</div>
        </div>
        <div className="status"></div>
      </div>
      <div className="fcbs py14">
        <div className='frbc w100t'>
          <label className='fz14 fw6 colorgrey' htmlFor='name'>Название</label>
          <input type="text" id='id' name='name' value={props.item.name} onChange={(e) => updateItem (props.item.id, 'name', e)} className={'ml10 p20 brx25 ' + styles.input}/>
        </div>
      </div>
      {/* <div className="frec w100t">
        <button className='fz14 fw6 colorwhite bgblue brx25 br0 p4-15' type="submit">Создать</button>
      </div> */}
    </div>
  );
}