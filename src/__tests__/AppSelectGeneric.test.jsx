/// <reference types="vitest" />
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, test, expect } from 'vitest';
import AppSelectGeneric from '../components/AppSelectGeneric';

describe('AppSelectGeneric', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];

  test('affiche le label', () => {
    render(
      <AppSelectGeneric
        id="select-test"
        label="Test Select"
        name="testSelect"
        value=""
        onChange={() => {}}
        options={options}
      />
    );
    expect(screen.getByLabelText(/Test Select/i)).toBeInTheDocument();
  });

  test('affiche toutes les options', () => {
    render(
      <AppSelectGeneric
        id="select-test"
        label="Test Select"
        name="testSelect"
        value=""
        onChange={() => {}}
        options={options}
      />
    );
    expect(screen.getByRole('option', { name: 'Option 1' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option 2' })).toBeInTheDocument();
  });

  test('appelle onChange lors d\'un changement de sélection', () => {
    const handleChange = vi.fn();
    render(
      <AppSelectGeneric
        id="select-test"
        label="Test Select"
        name="testSelect"
        value="option1"
        onChange={handleChange}
        options={options}
      />
    );
    fireEvent.change(screen.getByLabelText(/Test Select/i), { target: { value: 'option2' } });
    expect(handleChange).toHaveBeenCalled();
  });

  test('affiche le placeholder si fourni', () => {
    render(
      <AppSelectGeneric
        id="select-test"
        label="Test Select"
        name="testSelect"
        value=""
        onChange={() => {}}
        options={options}
        placeholder="Choisissez une option"
      />
    );
    expect(screen.getByRole('option', { name: 'Choisissez une option' })).toBeInTheDocument();
  });

  test('le champ est requis si required est true', () => {
    render(
      <AppSelectGeneric
        id="select-test"
        label="Test Select"
        name="testSelect"
        value=""
        onChange={() => {}}
        options={options}
        required
      />
    );
    expect(screen.getByLabelText(/Test Select/i)).toBeRequired();
  });
});
