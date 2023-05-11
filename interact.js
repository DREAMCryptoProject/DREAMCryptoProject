// Import web3.js library
const Web3 = require('web3');

// Create a new instance of Web3 with the HTTP provider pointing to your local blockchain node
const web3 = new Web3('http://localhost:8545');

// Import the contract ABI and address
const abi = [
    [
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
]
];
const contractAddress = '0xf2ae7fe9b0e815fd95981af5551fa8115108ec74'; // TODO: replace with your contract address

// Create a new instance of the contract object
const contract = new web3.eth.Contract(abi, contractAddress);

// Example functions to interact with the contract

// Get the amount and timestamp of the staked tokens for the current user
async function getStakedInfo() {
    const account = web3.eth.accounts.givenProvider.selectedAddress;

    const stakedInfo = await contract.methods.staked(account).call();

    console.log(`Amount staked: ${stakedInfo.amount}`);
    console.log(`Timestamp: ${new Date(stakedInfo.timestamp * 1000).toString()}`);
}

// Stake tokens
async function stake(amount) {
    const tx = await contract.methods.stake(amount).send({ from: web3.eth.accounts.givenProvider.selectedAddress });

    console.log('Transaction hash:', tx.transactionHash);
}

// Unstake tokens
async function unstake() {
    const tx = await contract.methods.unstake().send({ from: web3.eth.accounts.givenProvider.selectedAddress });

    console.log('Transaction hash:', tx.transactionHash);
}

// Get the reward for the current user
async function getReward() {
    const tx = await contract.methods.getReward().send({ from: web3.eth.accounts.givenProvider.selectedAddress });

    console.log('Transaction hash:', tx.transactionHash);
}

// Set the APY of the contract (only owner can call this function)
async function setAPY(apy) {
    const tx = await contract.methods.setAPY(apy).send({ from: web3.eth.accounts.givenProvider.selectedAddress });

    console.log('Transaction hash:', tx.transactionHash);
}

// Set the Matic token address of the contract (only owner can call this function)
async function setMaticToken(tokenAddress) {
    const tx = await contract.methods.setMaticToken(tokenAddress).send({ from: web3.eth.accounts.givenProvider.selectedAddress });

    console.log('Transaction hash:', tx.transactionHash);
}
