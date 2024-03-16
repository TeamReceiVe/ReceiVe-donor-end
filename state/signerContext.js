"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSigner = exports.SignerContext = void 0;
var react_1 = require("react");
// Create the context with the correct type
exports.SignerContext = (0, react_1.createContext)({
    signer: '',
    setSigner: function () { }
});
var useSigner = function () { return (0, react_1.useContext)(exports.SignerContext); };
exports.useSigner = useSigner;
//export const SignerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [signer, setSigner] = useState('');
//   return (
//      <SignerContext.Provider value={{ signer, setSigner }}>
//        {children}
//      </SignerContext.Provider>
//   );
//};
