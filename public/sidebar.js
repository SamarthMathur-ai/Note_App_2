const sdbar = document.querySelector('#sidebar');
const sdbarbtn = document.querySelector('#sidebarbtn')
const prevNotes = document.querySelectorAll('.sideIcon')
const svdnotecont = document.querySelector('#savedCont')


sdbarbtn.addEventListener('click', () => {
    sdbar.classList.toggle('open');
    // head.classList.toggle('open');
    // note.classList.toggle('opennt')
    console.log('sidebar clicked');
    

    // * We have to put this condition on sdbarbtn instesd of svdnodt cuz in previous it was depending upon if we have clicked on svd btn which is wrong logic.
    if(!sdbar.classList.contains('open')) {
        svdnotecont.classList.remove('open')
    }

})