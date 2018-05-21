 if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
     }

     web3.eth.defaultAccount = web3.eth.accounts[0];
     var LotteryContract = web3.eth.contract([
	{
		"constant": true,
		"inputs": [],
		"name": "manager",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "pickWinner",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getPlayers",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "enter",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "players",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]);
var Lottery = LotteryContract.at("0x1a7700b123d970e0694e4d10b6b0c537fb82eb19");




// $("#button").click(function(){
// 	x=$("#betamount").val();
// 	if(err)
// 			console.log(err);
// 	else
// 	// $("#loader").show();
// 	// Lottery.enter(web3.toWei(x,'ether'),(err,res)=>{
// 	// 	console.log(res);
// 	alert("button working");
// 	});
Lottery.manager((err,res)=>{
	if(err)
		console.log(err);
	else
		$("#manager").text(res);
});
Lottery.getPlayers((err,res)=>{
	if(err)
		console.log(err);
	else
		$("#playersno").text(res[0]);

});
web3.eth.getBalance("0x1a7700b123d970e0694e4d10b6b0c537fb82eb19",(err,res)=>{
	if(err)
		console.log(err);
	else
		$("#prize").text(res/1000000000000000000);

});

$("#button").click(function(){
	var user_address=web3.eth.defaultAccount;
	var bet         =$("#ether").val();
	console.log(bet);
	Lottery.enter({from:user_address,
		value:web3.toWei(bet,'ether')},(err,res)=>{
			if(err)
				console.log(err);
			else
				$("#transaction").text(res);
		});
	});
$("#winner").click(function(){
	Lottery.pickWinner((err,res)=>{
		if(err)
			console.log(err);
		else
			console.log(res);
	});
});



 
