import Web3 from 'web3';
import Crud from './contracts/Crud.json';
import detectEthereumProvider from '@metamask/detect-provider';

const initWeb3 = () => {
    const provider = detectEthereumProvider();
    return new Promise(async (resolve, reject)=>{  
        //case 1 - new metamask installed
        if(provider){
            const web3 = new Web3(window.ethereum);
            //resolve(web3);
            try {
                await window.ethereum.request({method: 'eth_requestAccounts'});     
                resolve(web3);
            } catch (error) {
                console.log('user denied access');
                reject(error); // user denied access
            }
        }

        //case 2 - old metamask
        else if(window.web3) {
            const web3 = new Web3(window.web3.currentProvider);            
            resolve(web3);
        }
        //case 3 - no metamask, fall back to local ganache provider
        else {        
            const provider = new Web3.providers.HttpProvider('http://localhost:9545');
            const web3 = new Web3(provider);
            resolve(web3);
        }
    });
    
}


const getContract = async(web3) =>{
    let currentNetwork = await web3.eth.net.getId();
    let deployedNetwork = Crud.networks[currentNetwork];
    return new web3.eth.Contract(
        Crud.abi,
        deployedNetwork && deployedNetwork.address
    );    
}


export{initWeb3,getContract};