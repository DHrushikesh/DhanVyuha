import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from '../redux/store.js'
import './index.css'
import App from './App.jsx'
import  { createBrowserRouter , RouterProvider } from 'react-router-dom'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element:<App/>,
      children:[{
        path:"/SignUp",
        element:<h1>Hello</h1>,
      }],
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
