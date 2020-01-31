// variables
const navbarBtn = document.querySelector('.navbar-btn');
const navbarLinks = document.querySelector('.navbar-links');



// navbar event listener
navbarBtn.addEventListener('click' , () => {
  let value = navbarLinks.classList.contains('navbar-collapse');

  if(value){
      navbarLinks.classList.remove('navbar-collapse');
      navbarBtn.classList.remove('change');
  }else{
      navbarLinks.classList.add('navbar-collapse');
      navbarBtn.classList.add('change');
  }
})