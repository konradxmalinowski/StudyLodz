import { render, screen } from '@testing-library/react-native';

import { ThemedText } from '@/components/themed-text';

describe('ThemedText', () => {
  it('renders its children', () => {
    render(<ThemedText>Witaj w Łodzi</ThemedText>);
    expect(screen.getByText('Witaj w Łodzi')).toBeTruthy();
  });

  it.each(['default', 'title', 'subtitle', 'defaultSemiBold', 'link', 'caption', 'overline', 'subtitleParagraph'] as const)(
    'renders without crashing for type="%s"',
    (type) => {
      render(<ThemedText type={type}>Tekst</ThemedText>);
      expect(screen.getByText('Tekst')).toBeTruthy();
    }
  );
});
