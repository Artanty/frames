import Icon from '@components/Icon';
import { RegisterApiRequest } from '@interfaces/api/auth';
import { upd } from '@services/helpers';
import React, { useState } from 'react';
import styles from '@styles/pages/auth.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../routeProviders/auth';

export default function Login () {
  
  const [formData, setFormData] = useState<RegisterApiRequest>({ 
    name: 'test',
    email: 'test@gmail.com', 
    password: 'test',
    password_confirmation: 'test'
  });
  const navigate = useNavigate();
  const location = useLocation();
  const auth = React.useContext(AuthContext);
  const from = location.state?.from?.pathname || "/";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    auth.register(formData, () => {
      navigate(from, { replace: true });
    });
  }

  const updateItem = (name: keyof RegisterApiRequest, e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value
    const nextState = upd(formData, name, newValue)
    setFormData(prevState => nextState)
  }
  
  return (
    <div>
      <div className='whx320-320 mt50'>
        <form className={'fcbh p20 brx8 ' + styles.form} onSubmit={handleSubmit}>
          <div className='frbc'>
            <div className='frsc'>
              <Icon icon='profile' size={70} color='blue'></Icon>
              <div className="fw7 fz14 ml10">Регистрация</div>
            </div>
            <div className="status"></div>
          </div>
          <div className="fcbs py14">
            <div className='frbc w100t mb20'>
              <label className='fz14 fw6 colorgrey' htmlFor='name'>Имя</label>
              <input type="text" id='name' name='name' onChange={(e) => updateItem ('name', e)} className={'ml10 p20 brx25 ' + styles.input}/>
            </div>
            <div className='frbc w100t mb20'>
              <label className='fz14 fw6 colorgrey' htmlFor='email'>EMAIL</label>
              <input type="text" id='email' name='email' onChange={(e) => updateItem ('email', e)} className={'ml10 p20 brx25 ' + styles.input}/>
            </div>
            <div className='frbc w100t mb20'>
              <label className='fz14 fw6 colorgrey' htmlFor='password'>Пароль</label>
              <input type="text" id='password' name='password' onChange={(e) => updateItem ('password', e)} className={'ml10 p20 brx25 ' + styles.input}/>
            </div>
            <div className='frbc w100t'>
              <label className='fz14 fw6 colorgrey' htmlFor='password_confirmation'>Повторите пароль</label>
              <input type="text" id='password_confirmation' name='password_confirmation' onChange={(e) => updateItem ('password_confirmation', e)} className={'ml10 p20 brx25 ' + styles.input}/>
            </div>
          </div>
          <div className="frec w100t">
            <button className='fz14 fw6 colorwhite bgblue brx25 br0 p4-15' type="submit">Зарегистрироваться</button>
          </div>
        </form>
      </div>
    </div>
  );
}
