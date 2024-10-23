// src/utils/auth.js
import { useNavigate } from 'react-router-dom';

let navigate;

export const initNavigation = (navigator) => {
  navigate = navigator;
};

export const redirectToLogin = () => {
  if (navigate) {
    navigate('/login');
  }
};
