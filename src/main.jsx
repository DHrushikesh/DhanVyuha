import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from '../redux/store.js'
import './index.css'
import App from './App.jsx'
import SignUp from './Signup/SIgnup.jsx'
import  { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Login from './Login/Login.jsx'
import Dashboard from './Dashboard/Dashboard.jsx'
import TransactionPage from './Transactions/TransactionsPage.jsx'

const router = createBrowserRouter(
  [
    
    {
      path: "/",
      element:<App/>,
      children:[{
        path:"/signup",
        element:<SignUp/>,
      },
      {
        path:"/login",
        element:<Login/>,
      },
      {
        path:"/dashboard",
        element:<Dashboard/>,
      },
      {
        path:"/transactions",
        element:<TransactionPage/>
      }
    ],
      errorElement:<h1>Unable to Connect 404</h1>
    }
  ])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider >
  </StrictMode>,
)
