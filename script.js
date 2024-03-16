const vendor = new Connex.Vendor("test");
var addressLabel = document.getElementById("loggedIn");
var address = "";

var itemDiv = document.getElementById("item");

function login() {
  vendor
    .sign("cert", {
      purpose: "identification",
      payload: {
        type: "text",
        content: "Please sign the certificate to continue purchase"
      }
    })
    //.accepted(() => alert("accepted"))
    .request()
    .then((r) => {Swal.fire({
      title: 'Login Success',
      text: 'Logged in successfully!\nAddress: ' + address,
      icon: 'success',
    })
      address = r.annex.signer;
      addressLabel.innerText = "Logged In: " + address;
      itemDiv.style.display = "inline-block";
    })
    .catch((e) => console.log("error:" + e.message));
}

function logout() {
  addressLabel.innerText = "Please login";
  itemDiv.style.display = "none";
  address = "";
}

function buy() {
  var txIdLabel = document.getElementById("txidLabel");
  vendor
    .sign("tx", [
      {
        to: "0x6e1Ab9A6556a328baD854c88d1b85651A6C3DC27",
        value: 100 * 1e18, //unit in wei
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
