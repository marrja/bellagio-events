import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'

// Code-split every page-level component (React.lazy + Suspense in App).
const Home = lazy(() => import('./pages/Home'))
const VenuesOverview = lazy(() => import('./pages/VenuesOverview'))
const VenueDetail = lazy(() => import('./pages/VenueDetail'))
const Packages = lazy(() => import('./pages/Packages'))
const Events = lazy(() => import('./pages/Events'))
const Gallery = lazy(() => import('./pages/Gallery'))
const About = lazy(() => import('./pages/About'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Contact = lazy(() => import('./pages/Contact'))
const ContactMerci = lazy(() => import('./pages/ContactMerci'))
const NotFound = lazy(() => import('./pages/NotFound'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'nos-espaces', element: <VenuesOverview /> },
      { path: 'espaces/:slug', element: <VenueDetail /> },
      { path: 'formules', element: <Packages /> },
      { path: 'evenements', element: <Events /> },
      { path: 'galerie', element: <Gallery /> },
      { path: 'a-propos', element: <About /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'contact', element: <Contact /> },
      { path: 'contact/merci', element: <ContactMerci /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
