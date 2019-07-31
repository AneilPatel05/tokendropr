const { Streamer } = require('steem-stream');

const options = {
    ACTIVE_KEY: '',
	POSTING_KEY: '',
    APP_NAME: 'smartdrop',
    USERNAME: 'smartdrop',
    BLOCK_CHECK_INTERVAL: 20,
	BLOCKS_BEHIND_WARNING: 10
  }

const ss = new Streamer(options);
const from = 'smartdrop';
var recievers=[];
// Kickstart the streamer to watch the Steem blockchain
ss.start();

ss.onSscJson((contractName, contractAction, contractPayload, sender, op, blockNumber, blockId, prevBlockId, trxId, blockTime)=>{
    if (contractName==='tokens' && contractAction==='transfer'){
        let payload = contractPayload;
        console.log(payload)
        if (payload.to){
            let memo = payload.memo.split(":");
            let droptype,url,account,amount,symbol,stakeSymbol,delegationSymbol,delegationAccount;
            if (memo[0]==='airdrop'){
                droptype =memo[1];
                switch (droptype) {
                    case 'voters' :{
                        url=memo[2];
                        amount=payload.quantity;
                        symbol=payload.symbol;
                        airdropVoters(url,amount,symbol);
                    }
                    break;
                    case 'resteems':{
                        url=memo[2];
                        amount=payload.quantity;
                        symbol=payload.symbol;
                        airdropResteems(url,amount,symbol);
                    }
                    break;
                    case 'followers':{
                        account=memo[2];
                        amount=payload.quantity;
                        symbol=payload.symbol;
                        airdropfollowers(account,amount,symbol);
                    }
                    break;
                    case 'stakers':{
                        stakeSymbol=memo[2];
                        amount=payload.quantity;
                        symbol=payload.symbol;
                        airdropStakers(stakeSymbol,amount,symbol);
                    }
                    break;
                    case 'delegators':{
                        delegationSymbol=memo[2];
                        delegationAccount=memo[3];
                        amount=payload.quantity;
                        symbol=payload.symbol;
                        airdropDelegators(delegationSymbol,amount,symbol);
                    }
                }
            }else{
                console.log("invalid memo")
            }

        }
    }
    
})

function airdropVoters(url,amount,symbol){
    console.log('voter airdrop called.')
}

function airdropResteems(url,amount,symbol){

}

function airdropfollowers(account,amount,symbol){

}

function airdropStakers(stakeSymbol,amount,symbol){
    console.log('staker airdrop called. for '+amount + symbol)
}

function airdropDelegators(delegationSymbol,amount,symbol){

}
