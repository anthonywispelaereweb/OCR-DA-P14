/// <reference types="vitest" />
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, test, expect } from 'vitest';
import AppDatePicker from '../components/AppDatePicker';

describe('AppDatePicker', () => {
  test('affiche le label et ouvre le calendrier au clic', () => {
    render(
      <AppDatePicker
        label="Date de test"
        name="testDate"
        value="2024-06-01"
        onChange={() => {}}
      />
    );
    expect(screen.getByLabelText(/Date de test/i)).toBeInTheDocument();
    // Le calendrier ne doit pas être visible au départ
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    // Clique sur l'input pour ouvrir le calendrier
    fireEvent.click(screen.getByLabelText(/Date de test/i));
    // Le calendrier doit maintenant être visible
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  test('appelle onChange lors de la sélection d\'une date', () => {
    const handleChange = vi.fn();
    render(
      <AppDatePicker
        label="Date de test"
        name="testDate"
        value="2024-06-01"
        onChange={handleChange}
      />
    );
    // Ouvre le calendrier
    fireEvent.click(screen.getByLabelText(/Date de test/i));
    // Clique sur le jour 15 (doit exister dans le mois affiché)
    const dayBtn = screen.getByRole('button', { name: '15' });
    fireEvent.click(dayBtn);
    expect(handleChange).toHaveBeenCalled();
    // Vérifie que la valeur passée est correcte
    const eventArg = handleChange.mock.calls[0][0];
    expect(eventArg.target.name).toBe('testDate');
    expect(eventArg.target.value).toMatch(/^\d{4}-\d{2}-15$/);
  });
}); 