/**
*   INVEST
*
*   Functions for investing in an event.
*/

function Payments() {}

Payments.getToken = function(paymentForm) {
    var stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
    var elements = stripe.elements();
}

Events.investIn = function(eventId, amount, stripeToken) {
    var stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
    
    
}