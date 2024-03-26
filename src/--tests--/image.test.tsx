import React from 'react';
import { render } from '@testing-library/react-native';
import ImageComponent from '../components/Image/image';

describe('ImageComponent', () => {
    const mockImage = {
      id: '1',
      name: 'https://example.com/image.jpg',
      handleDelete: jest.fn(),
      onClickFunction: jest.fn(),
    };
  
    it('renders correctly', () => {
      const { getByTestId } = render(<ImageComponent {...mockImage} />);
      const imageComponent = getByTestId('image-component');
      expect(imageComponent).toBeDefined();
    });
});
