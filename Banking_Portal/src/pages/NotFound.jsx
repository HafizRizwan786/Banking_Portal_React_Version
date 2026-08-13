import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1 className="not-found-code">404</h1>
        <h2>Page Not Found</h2>
        <p>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link to="/" className="not-found-link">
          <i className="fa-solid fa-house"></i>&nbsp;&nbsp;Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
