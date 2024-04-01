import { useRef } from 'react';
import { Form } from '@remix-run/react';

export default function Logout(): React.JSX.Element {
  const formRef = useRef<HTMLFormElement>(null);

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); 

    if (window.confirm('Are you sure you want to log out?')) {
      formRef.current?.submit(); 
    }
  };

  return (
    <>
      <Form ref={formRef} method="post" action="/logout">
        <button className="w-40 h-5 text-left" type="submit" onClick={handleLogout}>Logout</button>
      </Form>
    </>
  );
}
