import axios from 'axios';
import React, { createContext, useReducer, useContext, ReactNode } from 'react';

// Define types for your state

// Define action types

export interface IImage {
  id?: string;
  name?: string;
  longitude?:number
  latitude?:number;
  handleDelete?: (id: string) => void;
  onClickFunction?:(id:string)=>void;
}

interface ImagesProviderProps {
  children: ReactNode;
}
// Define the type for the state
interface ImagesState {
  images: IImage[];
  showGallery: boolean;
}

// Define action types
type Action =
  | { type: 'ADD_IMAGE'; payload: IImage }
  | { type: 'TOGGLE_GALLERY' };


// Define initial state
const initialState: ImagesState = {
  images: [], // Initially empty
  showGallery: false,
};

    // Define reducer function
const reducer = (state: ImagesState, action: Action): ImagesState => {

  switch (action.type) {
    case 'ADD_IMAGE':
      // No need to call `addImage` here, handle the action only
      return {
        ...state,
        images: [...state.images, action.payload],
      };
    case 'TOGGLE_GALLERY':
      return {
        ...state,
        showGallery: !state.showGallery, // Toggle the showGallery state
      };
    default:
      return state;
  }
};

// Create context
const PlaceContext = createContext<{
  state: ImagesState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

// Create provider component
export const ImageProvider: React.FC<ImagesProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PlaceContext.Provider value={{ state, dispatch }}>
      {children}
    </PlaceContext.Provider>
  );
};

// Create a custom hook to use the context
export const useImagesStore = () => useContext(PlaceContext);

// Example of using axios within your components
