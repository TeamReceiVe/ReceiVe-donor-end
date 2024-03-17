const connex = new Connex({
  node: "https://testnet.outofgas.io/",
  network: "test"
});
const resultDetails = document.getElementById("result");
var json = [];
var tokenSelect = document.getElementById("tokensList");
const url = "https://vechain.github.io/token-registry/test.json";
//token  list:  https://docs.vechain.org/others/miscellaneous.html#token-list

const params = new URLSearchParams(window.location.search);
const useraccountValue = params.get('user'); 
const numValue = parseInt(params.get('num'),10);

window.onload = function() {
  transferToken();
};


const transferABI = {
  constant: false,
  inputs: [
    { name: "_to", type: "address" },
    { name: "_amount", type: "uint256" }
  ],
  name: "transfer",
  outputs: [{ name: "success", type: "bool" }],
  payable: false,
  stateMutability: "nonpayable",
  type: "function"
};

const request = new XMLHttpRequest();
request.open("get", url);
request.send(null);
request.onload = function () {
  //if (request.status == 200) {
    //json = JSON.parse(request.responseText);
    //for (var i = 0; i < json.length; i++) {
     // var option = document.createElement("option");
    //  option.text = json[i].symbol;
   //   option.value = json[i].address;
  //    var select = document.getElementById("tokensList");
 //     select.appendChild(option);
//    }
//  }

  var option = document.createElement("option");
  option.text = "";
  option.value = json[i].address;
  var select = document.getElementById("tokensList");
  select.appendChild(option);
};

function transferToken() {
  const to = useraccountValue;
  const amount = BigInt(numValue);

  //the value unit is wei , thus, value need to multiply by 1e18
  const e18 = BigInt(1e18);
  const transferMethod = connex.thor
    .account("0xac0ca2a5148e15ef913f9f5cf8eb3cf763f5a43f")
    .method(transferABI);

  const clause = transferMethod.asClause(to, (amount * e18).toString(10));

  connex.vendor
    .sign("tx", [clause])
    .comment("transaction signing - transfer token")
    // .accepted(() => alert("accepted"))
    .request()
    .then((r) => (resultDetails.innerText = JSON.stringify(r, null, 4)))
    .catch((e) => console.log("error:" + e.message));
}