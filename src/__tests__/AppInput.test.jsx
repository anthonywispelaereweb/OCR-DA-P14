/// <reference types="vitest" />
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import AppInput from '../components/AppInput';

test('affiche le label et gère le changement de valeur', () => {
  const handleChange = vi.fn();
  render(
    <AppInput
      id="test-input"
      label="Test Label"
      name="test"
      value=""
      onChange={handleChange}
    />
  );
  // Vérifie que le label est affiché
  expect(screen.getByLabelText(/Test Label/i)).toBeInTheDocument();
  // Simule un changement de valeur
  fireEvent.change(screen.getByLabelText(/Test Label/i), { target: { value: 'abc' } });
  // Vérifie que la fonction de changement a été appelée
  expect(handleChange).toHaveBeenCalled();
}); 