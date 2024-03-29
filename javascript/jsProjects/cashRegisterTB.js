var denom = [
    { name: 'ONE HUNDRED', val: 100},
    { name: 'TWENTY', val: 20},
    { name: 'TEN', val: 10},
    { name: 'FIVE', val: 5},
    { name: 'ONE', val: 1},
    { name: 'QUARTER', val: 0.25},
    { name: 'DIME', val: 0.1},
    { name: 'NICKEL', val: 0.05},
    { name: 'PENNY', val: 0.01}
];

function checkCashRegister(price, cash, cid) {

    var output   = {status: null, change: []};
    var change   = cash - price;
    
    // create the register objet that has the total that we have in the box and also how much of each currency
    var register = cid.reduce(function(acc, curr) {
        acc.total += curr[1];
        acc[curr[0]] = curr[1];
        return acc;
    }, {total: 0});
    
    if(register.total === change) {
        output.status = 'CLOSED';
        output.change = cid;
        return output;
    }
    
    if(register.total < change) {
        output.status = 'INSUFFICIENT_FUNDS';
        return output;
    }

    // work with the value that was declared in the variable denom
    // and i work with the register array that contains all my coins
    var change_arr = denom.reduce(function(acc, curr) {
        var value = 0;
        while(register[curr.name] > 0 && change >= curr.val) {
            change -= curr.val;
            register[curr.name] -= curr.val;
            value += curr.val;
            change = Math.round(change * 100) / 100;
        }
        if(value > 0) {
            acc.push([ curr.name, value ]);
        }
        return acc;
    }, []);

    if(change_arr.length < 1 || change > 0) {
        output.status = 'INSUFFICIENT_FUNDS';
        return output;
    }
 
    output.status = 'OPEN';
    output.change = change_arr;
    return output;
}