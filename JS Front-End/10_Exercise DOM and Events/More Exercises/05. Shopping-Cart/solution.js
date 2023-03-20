function solve() {

    const divBtnRef = Array.from(document.getElementsByClassName('add-product'));
    const checkoutBtnRef = document.getElementsByClassName('checkout')[0];
    const buttons = Array.from(document.getElementsByTagName('button'));
    const products = {};

    divBtnRef
        .forEach(btn => {
            btn.addEventListener('click', handler);
        })
    
    checkoutBtnRef.addEventListener('click', handlerCheckout)

    function handler(event) {
        const productParentRef = event.target.parentNode.parentNode
        const textAreaRef = document.getElementsByTagName('textarea')[0];
        let product = productParentRef.getElementsByClassName('product-title')[0].textContent;
        let price = Number(productParentRef.getElementsByClassName('product-line-price')[0].textContent);
        textAreaRef.value += `Added ${product} for ${price.toFixed(2)} to the cart.\n`
        if (product in products) {
            products[product] += price
        } else {
            products[product] = price
        }
        
    }

    function handlerCheckout() {
        const textAreaRef = document.getElementsByTagName('textarea')[0];
        let list = [];
        let sum = 0;

        for (let key in products) {
            list.push(key)
            sum += products[key]
        }

        textAreaRef.value += `You bought ${list.join(', ')} for ${sum.toFixed(2)}.`
    
        buttons
            .forEach(btn => btn.setAttribute('disabled', ''));
    }
}