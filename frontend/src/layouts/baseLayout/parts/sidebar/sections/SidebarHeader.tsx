import React, { ChangeEventHandler, useRef, useEffect, useState } from 'react';
import styles2 from '@styles/components/dropdown.scss';
import styles from '@styles/pages/home/sidebar/sections/sidebarHeader.scss';
import Icon from '../../../../../components/Icon'
import { NavLink, useNavigate } from 'react-router-dom';
import useComponentVisible from '@services/helpers';
import { AuthContext } from '../../../../../routeProviders/auth';
export enum ELoginStatus {
  NOT_LOGGED_IN,
  LOGGED_IN
}
export enum EAuthAction {
  LOGOUT,
  LOGIN,
  REGISTER
}
export default function SidebarHeader() {
  const toggleSideBar = (e: any) => {
    console.log('toggleSideBar')
  }
  const handleSearchInput = (e: any) => {
    console.log(e)
  }
  const handleSarchInputIconClick = (e: any) => {
    console.log(e)
  }
  return (
    <div className={'frec p13 pr21 w100 ' + styles.wrapper}>
      <Icon icon='bell' size={80}></Icon>
      <NavLink
        to="/login"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        <div className={'ml10 mr3 ' + styles.avatar}></div>
      </NavLink>
      <Dropdown></Dropdown>
    </div>
  );
}

function Dropdown () {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<EAuthAction | null>(null)
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const auth = React.useContext(AuthContext);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  }

  const handleOptionClick = (action:  EAuthAction) => {
    switch (action) {
      case EAuthAction.LOGOUT:
        auth.signout(() => {
          navigate('/login');
        });
        break;
      case EAuthAction.LOGIN:
        navigate("/login")
        break;
      case EAuthAction.REGISTER:
        navigate("/signup")
        break;
      default:
        console.log(`I do not know what fruit this is. ${action}`);
    }
    setSelectedOption(action)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !(dropdownRef as any).current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownRef]);

  const buttons = [
    { visible: ELoginStatus.LOGGED_IN, name: 'Выйти', action: EAuthAction.LOGOUT },
    { visible: ELoginStatus.NOT_LOGGED_IN, name: 'Войти', action: EAuthAction.LOGIN },
    { visible: ELoginStatus.NOT_LOGGED_IN, name: 'Регистрация', action: EAuthAction.REGISTER }
  ]

  const renderOptions = () => {
    return (
      <>
        { buttons?.filter((el: any) => el.visible === Number(!!auth.user)).map((el: any, i: number) => (
        <li key={i} className={' ' + styles2.option} onClick={() => handleOptionClick(el.action)}>
          <span className={styles2.optionLink}>{el.name}</span>
        </li>
        ))}
      </>
    )
  }

  return (
    <div ref={dropdownRef} className={' ' + styles2.wrapper}>
      <div onClick={handleButtonClick}>
      <Icon icon='chevronDown' size={80}></Icon>
      </div>
      {isOpen && (
        <ul className={' ' + styles2.options}>
          { renderOptions() }
        </ul>
        
      )}
    </div>
  );

}





