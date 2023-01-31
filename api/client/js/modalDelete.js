export let deleteModal = () => {

    const modalOpenDelete = document.querySelector('.deleteSvg');
    const modalDelete = document.querySelector('.modalDelete');
    const modalCloseDelete = document.querySelector('#closeDeleteModal');


    modalOpenDelete.addEventListener('click',modalOpenDelete);
    modalCloseDelete.addEventListener('click',modalCloseDelete);

    modalOpenDelete.onclick = function () {
        modalDelete.style.display = "block";
    };

    modalCloseDelete.onclick = function () {
        modalDelete.style.display = "none";
    };
   

};