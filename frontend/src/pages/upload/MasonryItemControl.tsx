import Icon from '@components/Icon'
import styles from '@styles/pages/upload.scss'
import React, { useEffect, useRef, useState } from 'react'
import Dropdown from './Dropdown'
import { CreateFolderResponse } from '@interfaces/api/folder'
import { FileDTO } from './Dropzone'
import Loader from '@components/Loader'

export default function MasonryItemControl ({item, updatedItemAway}: {item: FileDTO, updatedItemAway: Function}) {
  const dropdownTriggerRef = useRef(null)
  const [selectedFolder, setSelectedFolder] = useState<CreateFolderResponse | null>(null)
  
  const handleSelectFolder = (nextSelectedFolder: CreateFolderResponse) => {
    setSelectedFolder(selectedFolder => nextSelectedFolder)
    item.folder = nextSelectedFolder
    updatedItemAway(item)
  }

  useEffect(() => {
    console.log('item foldr:')
    console.log(item)
    console.log(item.folder )
    if (item.folder?.id) {
      if (!selectedFolder) {
        setSelectedFolder(selectedFolder => (item.folder as CreateFolderResponse))
      } else if (selectedFolder && (selectedFolder?.id !== item.folder?.id)) {
        setSelectedFolder(selectedFolder => (item.folder as CreateFolderResponse))
      }
    }
  }, [item])

  const handleRemoveItem = () => {
    item.removed = true
    updatedItemAway(item)
  }

  const isVisibleControl = () => {
    const { loading, fileId, error } = item
    return !(loading || fileId || error)
  }
  return (
    <>
      <div className={'fcbh p20 brx8 w100 ' + styles.controls + ' ' + styles.controlItem}>
        {isVisibleControl() && 
        <div className='frbc w100t'>
          <Icon icon='folder' size={70} color='blue'></Icon>
          <div ref={dropdownTriggerRef} className={"tovfl fw7 fz14 ml10 crs " + (selectedFolder ? '' : 'colorred')}>{selectedFolder ? selectedFolder?.name : 'Не выбрана'}</div>
          <Dropdown selectFolderAway={handleSelectFolder} triggerRef={dropdownTriggerRef}></Dropdown>
          <div className="ml10 crs" onClick={handleRemoveItem}>
            <Icon icon='closeBorder' size={80} color='blue'></Icon>
          </div>
        </div>}
          {item.loading && <Loader visible={item.loading} block={true} noBg={true}></Loader>}
          {!item.loading && item.fileId && <div className="fz14 fw6 colorwhite bggreen brx25 br0 p4-15 w110 tac">Загружено</div>}
          {!item.loading && item.error && <div className="fz14 fw6 colorwhite bgred brx25 br0 p4-15 w130 tac">Не загружено</div>}
      </div>
    </>
  )
}
