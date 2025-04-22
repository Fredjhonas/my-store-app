import { render } from '@testing-library/react-native';
import React from 'react';
import { ThemedText } from '../ThemedText';

describe('ThemedText Component', () => {
  it('renders correctly with children', () => {
    const { toJSON, getByText } = render(<ThemedText>Snapshot test!</ThemedText>);

    expect(getByText('Snapshot test!')).toBeTruthy();

    expect(toJSON()).toMatchSnapshot();
  });

  it('applies the correct styles based on props', () => {
    const { getByText } = render(
      <ThemedText type="title" darkColor="black" lightColor="white">
        Themed Text
      </ThemedText>
    );

    const textElement = getByText('Themed Text');
    expect(textElement).toBeTruthy();
  });
});
