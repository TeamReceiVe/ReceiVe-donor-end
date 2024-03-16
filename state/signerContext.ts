import React, { createContext, useState, useContext } from 'react';

// Define the type for your context's value
type SignerContextType = {
   signer: string;
   setSigner: React.Dispatch<React.SetStateAction<string>>;
};


// Create the context with the correct type
export const SignerContext = createContext<SignerContextType>({
   signer: '',
   setSigner: () => { }
});


export const useSigner = () => useContext(SignerContext);


//export const SignerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [signer, setSigner] = useState('');


//   return (
 //      <SignerContext.Provider value={{ signer, setSigner }}>
   //        {children}
 //      </SignerContext.Provider>
//   );
//};
