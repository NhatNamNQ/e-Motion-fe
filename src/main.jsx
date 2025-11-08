import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { persistor, store } from './store'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthInitializer from './providers/AuthInitializer'
import { routes } from './routes'
import Loader from './components/Loader'
import { PersistGate } from 'redux-persist/integration/react'

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <AuthInitializer>
          <RouterProvider router={router} />
        </AuthInitializer>
      </PersistGate>
    </Provider>
  </StrictMode>
)
