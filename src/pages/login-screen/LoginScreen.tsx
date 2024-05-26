import { Link, Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppSelector';
import { FormEvent, useRef } from 'react';
import { login } from '../../store/api-actions';
import { validatePassword } from './utils';
import { getIsAuth } from '../../store/auth-process/selectors';

export function LoginScreen() {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(getIsAuth);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  if (isAuth) {
    return <Navigate to={AppRoute.root}/>;
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (emailRef.current && passwordRef.current && validatePassword(passwordRef.current.value)) {
      dispatch(login({
        email: emailRef.current.value,
        password: passwordRef.current.value
      }));
    } else {
      // eslint-disable-next-line no-alert
      alert('Некорректный email или пароль. Проверьте данные');
    }
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.root}>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={emailRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
          </section>
          {/* <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="#todo">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section> */}
        </div>
      </main>
    </div>
  );
}
