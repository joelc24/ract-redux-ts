import React from 'react';
import { Button, Switch, Typography, CircularProgress } from '@mui/material';

import { useCustomSelector, useCustomDispatch } from 'hooks/redux';
import { login } from 'redux/slice/auth';
import { setThemeMode } from 'redux/slice/settings';

import {
  AppBarStyled,
  AppbarContainerStyled,
  BodyContainerStyled,
  CardStyled
} from './HomeStyles';

const Home: React.FC = () => {
  const {
    auth: { accessToken, isLoading },
    settings: { themeMode }
  } = useCustomSelector((state) => state);
  const dispatch = useCustomDispatch();
  console.log(accessToken);

  const handleLogin = (): void => {
    void dispatch(
      login({
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      })
    );
  };

  const handleChangeTheme = (): void => {
    dispatch(setThemeMode(themeMode === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div>
      <AppBarStyled>
        <AppbarContainerStyled>
          <Typography variant="h6">
            TS - REACT - REDUX TOOLKIT - MATERIAL UI
          </Typography>
          <Switch onChange={handleChangeTheme} />
        </AppbarContainerStyled>
      </AppBarStyled>
      <BodyContainerStyled>
        <CardStyled>
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
          {isLoading && <CircularProgress size={24} />}
        </CardStyled>
      </BodyContainerStyled>
    </div>
  );
};

export default Home;
