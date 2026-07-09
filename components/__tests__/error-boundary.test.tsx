import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { ErrorBoundary } from '@/components/error-boundary';

function Bomb(): React.ReactElement {
  throw new Error('boom');
}

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <Text>Wszystko działa</Text>
      </ErrorBoundary>
    );
    expect(screen.getByText('Wszystko działa')).toBeTruthy();
  });

  it('renders a fallback instead of crashing when a child throws', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    expect(screen.getByText('Coś poszło nie tak')).toBeTruthy();

    consoleError.mockRestore();
  });
});
