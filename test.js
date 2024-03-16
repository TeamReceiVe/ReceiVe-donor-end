"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var connex_1 = require("@vechain/connex");
var signerContext_1 = require("./state/signerContext");
var useWalletConnex = function () {
    var _a = (0, react_1.useState)(null), connex = _a[0], setConnex = _a[1];
    var _b = (0, react_1.useState)(null), vendor = _b[0], setVendor = _b[1];
    var _c = (0, react_1.useState)(false), walletConnected = _c[0], setWalletConnected = _c[1];
    var setSigner = (0, signerContext_1.useSigner)().setSigner;
    (0, react_1.useEffect)(function () {
        var connexInstance = new connex_1.default({
            node: 'https://testnet.veblocks.net/',
            network: 'test',
        });
        setConnex(connexInstance);
        setVendor(new connex_1.default.Vendor('test'));
    }, []);
    var handleConnectWallet = function () {
        if (vendor) {
            vendor.sign("cert", {
                purpose: "identification",
                payload: {
                    type: "text",
                    content: "Connect your wallet to log in"
                }
            })
                .request()
                .then(function (r) {
                setSigner(r.annex.signer);
                setWalletConnected(true);
            })
                .catch(function () {
                setSigner('User Canceled');
                setWalletConnected(false);
            });
        }
    };
    return { connex: connex, vendor: vendor, walletConnected: walletConnected, handleConnectWallet: handleConnectWallet };
};
exports.default = useWalletConnex;
