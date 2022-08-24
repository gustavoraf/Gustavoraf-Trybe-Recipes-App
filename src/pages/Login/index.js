import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';

import eyeOpen from '../../images/eyeOpen.svg';
import eyeClosed from '../../images/eyeClosed.svg';

import AppContext from '../../context/AppContext';
import './Login.css';

export default function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const { setLogin } = useContext(AppContext);
  const history = useHistory();
  const [hidden, setHidden] = useState(true);
  const [visible, setVisible] = useState('password');
  function handleChange({ target }) {
    return target.name === 'user'
      ? setUser(target.value)
      : setPassword(target.value);
  }

  function handlePassword() {
    setHidden(!hidden);
    if (hidden) {
      setVisible('text');
    } else {
      setVisible('password');
    }
  }

  function handleClick() {
    setLogin({ user, password });
    localStorage.setItem('user', JSON.stringify({ email: user }));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    history.push('/comidas');
  }
  // referência para a regex utilizada: https://medium.com/@zackcreach/shred-the-gnar-how-to-write-decode-regex-for-email-validation-9a970fa91641
  const buttonDisabled = () => {
    const securityLength = 7;
    // Verifico de o email segue o padrao e se o tamanho da senha é maior ou igual a 7
    // Ser for verdadeiro eu removo o disabled do button
    return !(/(^\w.*@\w+\.\w)/.test(user) && password.length >= securityLength);
  };

  return (
    <form className="form-horizontal">
      <div className="form-content">
        <label htmlFor="user" className="input-email">
          E-mail
          <input
            type="text"
            data-testid="email-input"
            name="user"
            value={ user }
            onChange={ handleChange }
          />
        </label>
        <div className="input-password-area">
          <label htmlFor="password" className="input-password">
            Senha
            <input
              type={ visible }
              data-testid="password-input"
              name="password"
              value={ password }
              onChange={ handleChange }
            />
          </label>
          <button type="button" onClick={ handlePassword } className="btn-hidden">
            <img src={ hidden ? eyeOpen : eyeClosed } alt="eye-passowrd" />
          </button>
        </div>
        <button
          data-testid="login-submit-btn"
          type="button"
          className="enter-btn"
          disabled={ buttonDisabled() }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </div>
    </form>
  );
}
