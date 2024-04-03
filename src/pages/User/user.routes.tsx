import { Route, Routes, useParams } from 'react-router-dom'

import { AuthRoute } from '../common/AuthRoute'
import { NotFoundPage } from '../NotFound/NotFound'
import { SettingsContainer } from '../UserSettings/SettingsContainer'
import { UserProfile } from './content/UserProfile'

const userRouteElements = (id) => (
  <>
    <Route path=":id" element={<UserProfile />} />
    <Route
      path=":id/edit"
      element={
        <AuthRoute roleRequired="admin">
          {' '}
          <SettingsContainer adminEditableUserId={id} />{' '}
        </AuthRoute>
      }
    />
    <Route index element={<NotFoundPage />} />
  </>
)

const UserProfileRoutes = () => {
  const { id } = useParams()

  return <Routes>{userRouteElements(id)}</Routes>
}

export default UserProfileRoutes
