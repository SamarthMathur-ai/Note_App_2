
// document.getElementById('#head').click()
// * WRong for the following reason 1. don't use head 2. click doesn't always work use focus
document.getElementById('head').focus()

 
const head = document.querySelector('#head')
const note = document.querySelector('#note')

const svdnote = document.querySelector('#prevNotes')
const svdnotecont = document.querySelector('#savedCont')

const about = document.querySelector('#about')
const aboutBox = document.querySelector('#aboutBox')




function headEnter(event) {
    if(event.key == 'Enter') {
        document.getElementById('note').focus()
        note.readOnly = false     // * readOnly not readonly
        console.log('Enter pressed on head')
    }
}



head.addEventListener('keydown', headEnter)

svdnote.addEventListener('click', ()=>{
    svdnotecont.classList.toggle('open');
    console.log('Save Button Clicked')
     

})


// * about button about
about.addEventListener('click', ()=> {
    aboutBox.classList.toggle('open');
    console.log('about button click')
})

// * If sidebar is closed then the container should also be closed



   



url = "https://vedicscriptures.github.io/chapters"
async function BhagvtGta() {
    let res1 = await axios.get(url)
    for(let i = 0; i <18; i++) {
        console.log(res1.data[i].summary.en)
    }
    
    

    // let res2 = await fetch(url)
    // let data2 = await res2.json()
    // console.log(data2[1].summary.en)
}








