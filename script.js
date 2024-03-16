const vendor = new Connex.Vendor("test");
var addressLabel = document.getElementById("loggedIn");
var address = "";

var itemDiv = document.getElementById("item");
var supportDiv = document.getElementById("support");
const params = new URLSearchParams(window.location.search);
const useraccountValue = params.get('user'); 
const numValue = parseInt(params.get('num'),10);

function login() {
  vendor
    .sign("cert", {
      purpose: "identification",
      payload: {
        type: "text",
        content: "Please sign the certificate to continue purchase\n" + useraccountValue
      }
    })
    //.accepted(() => alert("accepted"))
    .request()
    .then((r) => {Swal.fire({
      title: 'Login Success',
      text: 'Logged in successfully!\nAddress: ' + r.annex.signer,
      icon: 'success',
    })
      address = r.annex.signer;
      addressLabel.innerText = "Logged In: " + address;
      itemDiv.style.display = "inline-block";
      supportDiv.style.display = "inline-block";
    })
    //.catch((e) => console.log("error:" + e.message));
    .catch((e) => Swal.fire({
      title: 'Error!',
      text: 'Login failed.\nError: ' + e.message,
      icon: 'error',
    }));
}

function logout() {
  addressLabel.innerText = "Please login";
  itemDiv.style.display = "none";
  supportDiv.style.display = "none";
  address = "";
}

function buy() {
  var txIdLabel = document.getElementById("txidLabel");
  var cups = 1;
  const cupsRadio = document.getElementsByName("cups");
  
  for (var i = 0; i < cupsRadio.length; i++) {
    if (cupsRadio[i].checked) {
      cups = cupsRadio[i].value;
    }
  }
  vendor
    .sign("tx", [
      {
        //to: "0x6e1Ab9A6556a328baD854c88d1b85651A6C3DC27",
        to: r.annex.signer,
        //value: 100 * 1e18 * cups, //unit in wei
        value: 100 * 1e18 * numValue,
        data: "0x"
      }
    ])
  //enforce signer
  .signer(address)
    //a link that can redirect user to visit
    .link("https://explore-testnet.vechain.org/transactions/{txid}")
    .comment("buy some love")
    //.accepted(() => alert("accepted"))
    .request()
    //.then((r) => (txIdLabel.innerText = "TxId: " + r.txid))

    .then((r) => Swal.fire({
      title: 'Completed!',
      text: 'Transaction completed. Thx for the money :)\nTxId: ' + r.txid,
      icon: 'success',
    }))
    //.catch((e) => console.log("error:" + e.message));
    .catch((e) => Swal.fire({
      title: 'Error!',
      text: 'Transaction failed. Are you poor?\nError: ' + e.message,
      icon: 'error',
    }));
}
