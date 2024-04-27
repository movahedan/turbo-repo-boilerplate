import { screen, fireEvent } from '@testing-library/react';

import { renderWithLocale } from '@repo/utilities-test';

import { ChangeLocale } from './change-locale';

jest.mock('next-intl', () => ({
  ...jest.requireActual('next-intl'),
  useLocale: jest.fn(),
}));

describe('changeLocale', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render with correct URL for changing locale', () => {
    (useLocale as jest.Mock).mockReturnValueOnce('en');
    (usePathname as jest.Mock).mockReturnValueOnce('/some-page');

    renderWithLocale(<ChangeLocale />);

    const linkElement = screen.getByLabelText('Change locale to nl');
    expect(linkElement).toHaveAttribute('href', '/nl/some-page?param=value');
  });

  test('should change locale when clicked', () => {
    (useLocale as jest.Mock).mockReturnValueOnce('nl');
    (usePathname as jest.Mock).mockReturnValueOnce('/some-page');

    renderWithLocale(<ChangeLocale />);

    const linkElement = screen.getByLabelText('Change locale to en');
    fireEvent.click(linkElement);

    expect(linkElement).toHaveAttribute('href', '/en/some-page?param=value');
  });
});
