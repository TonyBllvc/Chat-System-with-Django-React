import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from './store';
import { createTheme, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import reportWebVitals from './reportWebVitals';

const theme = createTheme({
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    h1: 'h2',
                    h2: 'h2',
                    h3: 'h2',
                    h4: 'h2',
                    h5: 'h2',
                    h6: 'h2',
                    subtitle1: 'h2',
                    subtitle2: 'h2',
                    body1: 'span',
                    body2: 'span',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: '#f2f2f2', // Slightly dark background color
                    borderRadius: '.2rem',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'transparent', // Remove border
                        },
                        '&:hover fieldset': {
                            borderColor: 'transparent', // Remove border on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'transparent', // Remove border on focus
                        },
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    backgroundColor: '#f2f2f2', // Slightly dark background color
                    borderRadius: '.2rem',
                    outline: 'none',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'transparent', // Remove border
                        },
                        '&:hover fieldset': {
                            borderColor: 'transparent', // Remove border on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'transparent', // Remove border on focus
                        },
                    },
                },
            },
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ChakraProvider>
            <ThemeProvider theme={theme}>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <App />
            </ThemeProvider>
        </ChakraProvider>
    </Provider>
);
