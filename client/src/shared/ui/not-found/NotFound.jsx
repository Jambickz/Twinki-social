import { Link } from 'react-router-dom'

export const NotFound = ({ profile }) => {
  return (
    <div>
      {profile && (
        <div>
          This account doesn’t exist
          Try searching for another.
        </div>
      )}
      {!profile && (
        <div>
          <h1>404 Page Not Found</h1>
          <Link to={'/'}>Вернуться домой</Link>
        </div>
      )}
    </div>
  )
}
