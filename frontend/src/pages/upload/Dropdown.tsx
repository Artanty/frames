import Icon from "@components/Icon";
import Loader from "@components/Loader";
import { CreateFolderResponse } from "@interfaces/api/folder";
import api from "@services/api";
import React, { useState, useRef, useEffect } from "react";
import styles2 from '@styles/components/dropdown.scss';
export default function Dropdown ({triggerRef, selectFolderAway}: {triggerRef?: React.MutableRefObject<null>, selectFolderAway: Function}) {
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
      <Icon icon='chevronDown' wrapper={'crs'} size={80}></Icon>
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