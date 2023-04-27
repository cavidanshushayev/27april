import { getAllCategories ,deleteCategoryByID, postCategory } from "./httprequests.js";

let list = document.querySelector(".categories");
getAllCategories().then(data => {
    data.forEach(category => {
        list.innerHTML += `<li class="list-group-item d-flex justify-content-between">
        <span> ${category.name}</span>
        <button class="btn btn-danger" data-id=${category.id}>x</button>
        </li>`

    });

    Array.from(list.children).forEach((item) => {
        let deletebutton = item.children[1];
        deletebutton.addEventListener("click", (e) => {
            //sweat alert
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    let id=e.target.getAttribute("data-id");
                    deleteCategoryByID(id)
                    //delet from ui
                    e.target.parentElement.remove();
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        'Cancelled',
                        'Your imaginary file is safe :)',
                        'error'
                    )
                }
            })
        })

    })

})


let openmodal=document.querySelector(".open-modal");
let closemodal=document.querySelector(".close-modal");
let modal =document.querySelector("#add-category-modal")
openmodal.addEventListener("click",() =>{
  document.body.classList.add("modal-body");
  modal.style.opacity="1";
  modal.style.visibility="visible";
  modal.style.transform="translate(-50%,-50%) scale(1)";  


})

closemodal.onclick=function(){
   modalclose();
  
}

  function modalclose(){
    document.body.classList.remove("modal-body");
    modal.style.opacity="0";
    modal.style.visibility="hidden";
    modal.style.transform="translate(-50%,-50%) scale(0)";  
  
  }


let nameinp=document.querySelector("#name")
let descinput=document.querySelector("#desc");
let form=document.querySelector("#btsubmit");



form.addEventListener("click",(e)=>{
e.preventDefault();
const category={
    name :nameinp.value, 
    description: descinput.value

};
    nameinp.value="";
    descinput.value="";
    postCategory(category).then(createdCategory =>{

    

    list.innerHTML +=`<li class="list-group-item d-flex justify-content-between">
    <span> ${createdCategory.name}</span>
    <button class="btn btn-danger" data-id=${category.id}>x</button>
    </li>`
})

    modalclose();
})