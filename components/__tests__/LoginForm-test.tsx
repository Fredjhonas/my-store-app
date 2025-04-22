import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import LoginForm from '../forms/LoginForm';

describe('LoginForm Component', () => {
  it('renders the login form correctly', () => {
    render(
      <LoginForm
        onSubmit={jest.fn()}
        onChange={jest.fn()}
        formData={{ username: '', password: '' }}
        loading={false}
      />
    );

    expect(screen.getByLabelText(/username/i)).toBeTruthy();
    expect(screen.getByLabelText(/password/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /login/i })).toBeTruthy();
  });

  it('calls onSubmit with username and password when form is submitted', () => {
    const mockOnSubmit = jest.fn();

    // Create a test wrapper component with state management
    const TestWrapper = () => {
      const [formData, setFormData] = React.useState({ username: '', password: '' });

      const handleChange = (key: string, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
      };

      return (
        <LoginForm
          onSubmit={mockOnSubmit}
          onChange={handleChange}
          formData={formData}
          loading={false}
        />
      );
    };

    render(<TestWrapper />);

    fireEvent.changeText(screen.getByLabelText(/username/i), 'testuser');
    fireEvent.changeText(screen.getByLabelText(/password/i), 'password123');

    // Allow state to update
    fireEvent.press(screen.getByRole('button', { name: /login/i }));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123',
    });
  });

  it('displays an error message when username or password is missing', () => {
    const mockOnSubmit = jest.fn();
    render(
      <LoginForm
        onSubmit={mockOnSubmit}
        onChange={jest.fn()}
        formData={{ username: '', password: '' }}
        loading={false}
      />
    );

    fireEvent.press(screen.getByRole('button', { name: /login/i }));

    expect(mockOnSubmit).not.toHaveBeenCalled();
    expect(screen.getByText(/El usuario es requerido/i)).toBeTruthy();
    expect(screen.getByText(/La contraseña es requerida/i)).toBeTruthy();
  });

  it('disables the login button when loading is true', () => {
    render(
      <LoginForm
        onSubmit={jest.fn()}
        onChange={jest.fn()}
        formData={{ username: '', password: '' }}
        loading={true}
      />
    );

    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeDisabled();
  });

  it('calls onChange when input fields are updated', () => {
    const mockOnChange = jest.fn();
    render(
      <LoginForm
        onSubmit={jest.fn()}
        onChange={mockOnChange}
        formData={{ username: '', password: '' }}
        loading={false}
      />
    );

    fireEvent.changeText(screen.getByLabelText(/username/i), 'newuser');
    fireEvent.changeText(screen.getByLabelText(/password/i), 'newpassword');

    expect(mockOnChange).toHaveBeenCalledTimes(2);
    expect(mockOnChange).toHaveBeenCalledWith('username', 'newuser');
    expect(mockOnChange).toHaveBeenCalledWith('password', 'newpassword');
  });
});
