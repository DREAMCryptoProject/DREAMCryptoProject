const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const contractAddress = '0xf2ae7fE9b0E815fd95981AF5551fA8115108eC74'; // Replace with your contract address

const web3 = new Web3(window.ethereum);

const contract = new web3.eth.Contract(abi, contractAddress);

async function getAccount() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  return accounts[0];
}

async function getStakedAmount() {
  const account = await getAccount();
  const stakedInfo = await contract.methods.staked(account).call();
  return stakedInfo.amount;
}

async function getReward() {
  try {
    const account = await getAccount();
    const tx = await contract.methods.getReward().send({ from: account });
    console.log(tx);
    alert(`Reward of ${web3.utils.fromWei(tx.events.RewardPaid.returnValues[1])} MATIC paid successfully!`);
  } catch (error) {
    console.error(error);
    alert('Error getting reward. Please try again later.');
  }
}

async function stakeTokens() {
  try {
    const amount = document.getElementById('stake-amount').value;
    const account = await getAccount();
    const tx = await contract.methods.stake(web3.utils.toWei(amount)).send({ from: account });
    console.log(tx);
    alert(`Staked ${amount} MATIC successfully!`);
    location.reload();
  } catch (error) {
   
