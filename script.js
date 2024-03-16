const vendor = new Connex.Vendor("test");
var addressLabel = document.getElementById("loggedIn");
var address = "";

const params = new URLSearchParams(window.location.search);
const useraccountValue = params.get('user'); 
const numValue = parseInt(params.get('num'),10);

window.onload = function() {
  login();
};

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
      text: 'Logged in successfully! Address: ' + r.annex.signer,
      icon: 'success',
      showCloseButton: false,
      showCancelButton: true,
      focusConfirm: true,
      confirmButtonText: "Confirm Transaction",
      cancelButtonText: "Cancel",
      timer: 2000,
      timerProgressBar: true
    }).then((result) => {
      if (!result.isCancelled) {
        buy();
      }
    });
      address = r.annex.signer;
      addressLabel.innerText = "Logged In: " + address;
    })
    .catch((e) => Swal.fire({
      title: 'Error!',
      text: 'Login failed. Error: ' + e.message,
      icon: 'error',
      timer: 10000,
      timerProgressBar: true,
    }));
}

function logout() {
  addressLabel.innerText = "Please login";
  address = "";
}

function buy() {
  try {
  vendor
    .sign("tx", [
      {
        //to: "0x6e1Ab9A6556a328baD854c88d1b85651A6C3DC27",
        to: useraccountValue,
        //value: 100 * 1e18 * cups, //unit in wei
        value: 1e18 * numValue,
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
      text: 'Transaction completed. TxId: ' + r.txid,
      icon: 'success',
      timer: 10000,
      timerProgressBar: true,
    }))
    //.catch((e) => console.log("error:" + e.message));
    .catch((e) => Swal.fire({
      title: 'Error!',
      text: 'Transaction failed. Error: ' + e.message,
      icon: 'error',
      timer: 10000,
      timerProgressBar: true,
    }));
  }
  catch {
    Swal.fire({
      title: 'Error!',
      text: 'Transaction initiation failed. Account details or numerical value incorrect.',
      icon: 'error',
      timer: 10000,
      timerProgressBar: true,
    })
  };
}
