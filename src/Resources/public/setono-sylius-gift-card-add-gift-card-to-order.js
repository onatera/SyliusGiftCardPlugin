HTMLElement.prototype.addGiftCardToOrder = function () {
    const element = this;
    const url = element.dataset.action;
    const redirectUrl = element.dataset.redirect;

    element.addEventListener('submit', function (event) {
        event.preventDefault();

        const xhr = new XMLHttpRequest();
        const data = new FormData(element);
        const params = new URLSearchParams(data);

        const opts = {
            method: 'POST',
            body: params
        }

        fetch(url, opts)
            .then(res => {
                if (res.redirected) {
                    window.location.href = redirectUrl;
                } else {
                    res.text().then(function (text) {
                        document.querySelector('.setono-sylius-gift-card-gift-card-block').outerHTML = text;
                        document.querySelector('#setono-sylius-gift-card-add-gift-card-to-order').addGiftCardToOrder();
                    });
                }
            })
            .catch(err => console.log(err));
        }
    );
}