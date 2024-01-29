import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error)
  return (
    <div >
        error page
        <br />
        {error.message || error.data }
    </div>
  );
}
export default ErrorPage;