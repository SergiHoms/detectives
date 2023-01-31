export let emailModal = () => {

    const modalOpenEmail = document.querySelector('.emailSvg');
    const modalEmail = document.querySelector('.modalEmail');
    const modalCloseEmail = document.querySelector('#closeEmailModal');


    modalOpenEmail.addEventListener('click',modalOpenEmail);
    modalCloseEmail.addEventListener('click',modalCloseEmail);

    modalOpenEmail.onclick = function () {
        modalEmail.style.display = "block";
    };

    modalCloseEmail.onclick = function () {
        modalEmail.style.display = "none";
    };
};