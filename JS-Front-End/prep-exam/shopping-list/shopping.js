function shopping(input) {
    let itemCollection = input.shift().split('!');

    let shoppingCommand = {
        'Urgent': urgentShopping,
        'Unnecessary': unnecessaryShopping,
        'Correct': correctShopping,
        'Rearrange': rearrangeShopping,
    };

    for(let line in input) {
        if(line === 'Go Shopping') {
            break;
        }

        let commandTokens = input.shift().split(' ');
        let command = commandTokens[0];
        shoppingCommand[command](...commandTokens.slice(1));
    }


    function urgentShopping(item) {
        if(!itemCollection.includes(item)){
            itemCollection.unshift(item);
        }
    }

    function unnecessaryShopping(item) {
        if(!itemCollection.includes(item)){
            itemCollection.remove(itemCollection.indexOf(item));
        }
    }

    function correctShopping(oldItem, newItem) {
        if(itemCollection.includes(oldItem)) {
            itemCollection[itemCollection.indexOf(oldItem)] = newItem;
        }
    }

    function rearrangeShopping(item) {
        if(!itemCollection.includes(item)){
            itemCollection.remove(itemCollection.indexOf(item));
            itemCollection.push(item);
        }
    }

}

shopping(
    [
        "Tomatoes!Potatoes!Bread",
        "Unnecessary Milk",
        "Urgent Tomatoes",
        "Go Shopping!"
    ]
)