import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { useAuth } from '../components/AuthContext';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Button, useDisclosure } from '@nextui-org/react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // For modal
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      await apiService.login({ email, password });
      login(email, password);
      navigate('/');
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid credentials.');
      onOpen(); // Open modal on failure
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-900 via-blue-900 to-gray-900 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl space-y-6 border border-white/20">
        
        {/* Header */}
        <div>
          <h2 className="text-center text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-white to-blue-600 text-transparent bg-clip-text transition-all">
            Admin Login
          </h2>
          <p className="text-center text-sm text-white/70 mt-2">
            Welcome back! Please enter your details below.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/90">Email address</label>
              <input
                id="email"
                type="email"
                required
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md border border-white/20 bg-white/10 text-white placeholder-white/50 shadow-sm 
                focus:border-pink-400 focus:ring focus:ring-pink-500 focus:ring-opacity-50 disabled:opacity-50"
                placeholder="  you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/90">Password</label>
              <input
                id="password"
                type="password"
                required
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-md border border-white/20 bg-white/10 text-white placeholder-white/50 shadow-sm 
                focus:border-pink-400 focus:ring focus:ring-pink-500 focus:ring-opacity-50 disabled:opacity-50"
                placeholder="  Enter your password"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 via-white to-blue-500 font-semibold 
              rounded-md shadow-md hover:from-purple-700 hover:to-pink-600 focus:outline-none 
              focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>

      {/* Error Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-red-500">Login Failed</ModalHeader>
              <ModalBody>
                <p>{errorMessage || 'Invalid email or password. Please try again.'}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LoginPage;
