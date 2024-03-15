import { useRouteError } from 'react-router-dom';

export const Error = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      error page
      <br />
      {error.message || error.data}
    </div>
  );
};
