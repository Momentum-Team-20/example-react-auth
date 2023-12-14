import { Outlet, Navigate } from 'react-router-dom'
const ProtectedRoute = ({ token }) => {
  if (!token) {
    return <Navigate to="/login" />
  }

  return <Outlet context={token} />
}

export default ProtectedRoute
