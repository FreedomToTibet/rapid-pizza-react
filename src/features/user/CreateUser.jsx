import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import { setUser } from './userSlice';


function CreateUser() {
  const [username, setUsername] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
		if (!username) return;
		dispatch(setUser(username));
		setUsername('');
		navigate('/menu');
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base" >👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
				className="w-72 border border-stone-300 px-2 py-1 rounded-md input mb-8"
      />

      {username !== '' && (
        <div>
          <Button>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
