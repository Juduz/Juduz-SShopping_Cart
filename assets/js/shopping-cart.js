var shoppingCart = [];
$(document).ready(function() {
    outputCart();
    $(".productItem").click(function(e) {
        e.preventDefault();
        var itemInfo = $(this.dataset)[0];
        itemInfo.qty = 1;
        var itemincart = false;

        $.each(shoppingCart, function(index, value) {
            if (value.id == itemInfo.id) {
                value.qty = parseInt(value.qty) + parseInt(itemInfo.qty);
                itemincart = true;
            }
        })

        if (!itemincart) {
            shoppingCart.push(itemInfo);
        }
        sessionStorage["shopc"] = JSON.stringify(shoppingCart);
        outputCart();

    })

    function outputCart() {
        if (sessionStorage["shopc"] != null) {
            shoppingCart = JSON.parse(sessionStorage["shopc"].toString());
            $("#checkoutdiv").show();
        }
        var holderHTML = '';
        var total = 0;
        var itemCnt = 0;
        $.each(shoppingCart, function(index, value) {
            console.log(value);
            var stotal = value.qty * value.price;
            total += stotal;
            itemCnt += value.qty
            holderHTML += '<div>item ' + value.name + '(' + value.s + ')Qty ' + value.qty + ' Price '+ formatMoney(value.price) +' ID(' + value.id + ') Subtotal = ' + formatMoney(stotal) + '</div>';
        })
        holderHTML += '<div>' + formatMoney(total) + '</div>';
        $("#output").html(holderHTML);
        $(".total").html(formatMoney(total));
        $(".items").html(itemCnt);
    }
    
    function formatMoney(n){
        return "$" + (n/100).toFixed(2);
    }
});
