/*
 * File: app/controller/itemController.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.4.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.4.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('StripeCheckoutSample.controller.itemController', {
    extend: 'Ext.app.Controller',

    config: {
        views: [
            'landingPage'
        ],

        refs: {
            landingPage: 'landingpage'
        },

        control: {
            "button#buyItemButton": {
                tap: 'onBuyItemButtonTap'
            },
            "button#generateItemButton": {
                tap: 'onGenerateItemButtonTap'
            }
        }
    },

    onBuyItemButtonTap: function(button, e, eOpts) {
        var view = this.getLandingPage();
        var merchant = view.down('#merchantField').getValue();
        var description = view.down('#descriptionField').getValue();
        var price = view.down('#priceField').getValue();

        this.checkoutWithItem(merchant, price, description);
    },

    onGenerateItemButtonTap: function(button, e, eOpts) {
        console.log("Generating item...");

        var merchantName = this.getMerchantName();
        var itemPrice = this.getItemPrice();
        var description = this.getDescription();

        this.setFormValues(merchantName, itemPrice, description);
    },

    getDescription: function() {
        var potentialDescriptions = [
            "Simply the best there is!",
            "Not a single one like it.",
            "The greatest you've ever seen!",
            "Exactly what you need."
        ];

        return this.getRandomValue(potentialDescriptions);
    },

    getItemPrice: function() {
        return Math.floor((Math.random()* 10000));
    },

    getMerchantName: function() {
        var potentialNames = [
            "Merchant1",
            "Merchant2",
            "Merchant3",
            "Merchant4",
            "Merchant5",
            "Merchant6"
        ];

        return this.getRandomValue(potentialNames);
    },

    getRandomValue: function(array) {
        var index = Math.round(Math.random() * (array.length - 1));
        return array[index];
    },

    setFormValues: function(name, price, desc) {
        var view = this.getLandingPage();
        var priceField = view.down('#priceField');
        var merchantField = view.down('#merchantField');
        var descriptionField = view.down('#descriptionField');

        priceField.setValue(price);
        merchantField.setValue(name);
        descriptionField.setValue(desc);
    },

    checkoutWithItem: function(merchant, price, description) {
        var handler = StripeCheckout.configure({
            shippingAddress: false,
        //     key: PUBLIC_STRIPE_KEY,
            address: true,
            amount: price,
            currency: 'usd',
            name: merchant,
            description: description,
            panelLabel: 'Checkout',
            allowRememberMe: true,
            token: function(token, args){
                console.log("In token function.");
                console.log("Token from transaction: ", token);
                console.log("Our args: ", args);
            }
        });

        handler.open();
    }

});