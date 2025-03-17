import React, { createContext, useContext, useState, Dispatch, SetStateAction, PropsWithChildren } from 'react';

// Define the shape of your image data
export interface ImageData {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    type_gen: string;
    model: string;
    steps: number;
    cfg: number;
    denoise: number;
    weights_interpretator: string;
    upscale: string;
    facelock_weight: number;
    facelock_type: string;
    pose_weight: number;
    inpaint_what: string;
    prompt: string;
    size: string;
    id_gen: string;
    host_gen: string;
    time_gen: string;
    age: string;
    gender: string;
    ethnicity: string;
    style: string;
    tool: string;
    pipeline: string;
    neg_prompt: string;
    loras: string;
    res_image: string;
    favorite: boolean;
    cost: number;
    shared_gallery: number;
    gallery_image_likes: number;
    category: string;
}

// Define the shape of your context
export interface ImageContextType {
    userImages: ImageData[];
    setUserImages: Dispatch<SetStateAction<ImageData[]>>;
}

// Create the context
const ImageContext = createContext<ImageContextType | undefined>(undefined);

// Custom hook to access the context
export function useImageContext(): ImageContextType {
    const context = useContext(ImageContext);
    if (!context) {
        throw new Error('useImageContext must be used within an ImageProvider');
    }
    return context;
}

// Context provider component
// export const ImageProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
//     const [userImages, setUserImages] = useState<ImageData[]>([]);

//     return (
//         <ImageContext.Provider value={{ userImages, setUserImages }}>
//         {children}
//         </ImageContext.Provider>
//     );
// };

// Define the shape of your context for Discovery Images
export interface DiscoveryImageContextType {
    discoveryImages: ImageData[];
    setDiscoveryImages: Dispatch<SetStateAction<ImageData[]>>;
}

// Create the context for Discovery Images
const DiscoveryImageContext = createContext<DiscoveryImageContextType | undefined>(undefined);

// Custom hook to access the Discovery Image context
export function useDiscoveryImageContext(): DiscoveryImageContextType {
    const context = useContext(DiscoveryImageContext);
    if (!context) {
        throw new Error('useDiscoveryImageContext must be used within a DiscoveryImageProvider');
    }
    return context;
}


export interface ActionState {
    functionName: string;
    imageId: string;
}

// Define the shape of your context
export interface ActionContextType {
    userAction: ActionState;
    setUserAction: Dispatch<SetStateAction<ActionState>>;
}

// Create the context
const ActionContext = createContext<ActionContextType | undefined>(undefined);

// Custom hook to access the context
export function useActionContext(): ActionContextType {
    const context = useContext(ActionContext);
    if (!context) {
    throw new Error('useActionContext must be used within an ActionProvider');
    }
    return context;
}

// // Context provider component
// export const ActionProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
//     const [userAction, setUserAction] = useState<ActionState>({ functionName: '', imageId: '' });

//     return (
//         <ActionContext.Provider value={{ userAction, setUserAction }}>
//         {children}
//         </ActionContext.Provider>
//     );
// };

// Composite Provider that includes both Image and Action contexts
export const AppContextProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    // State for ImageContext
    const [userImages, setUserImages] = useState<ImageData[]>([]);

    // State for ActionContext
    const [userAction, setUserAction] = useState<ActionState>({ functionName: '', imageId: '' });

    // State for Discovery Images
    const [discoveryImages, setDiscoveryImages] = useState<ImageData[]>([]);

    return (
        <ImageContext.Provider value={{ userImages, setUserImages }}>
            <DiscoveryImageContext.Provider value={{ discoveryImages, setDiscoveryImages }}>
                <ActionContext.Provider value={{ userAction, setUserAction }}>
                    {children}
                </ActionContext.Provider>
            </DiscoveryImageContext.Provider>
        </ImageContext.Provider>
    );
};