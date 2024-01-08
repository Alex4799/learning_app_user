let threeMenue=document.getElementById('three-menue');
let sideNav=document.getElementById('side-nav');
let crossx=document.getElementById('crossx');

threeMenue.addEventListener('click',function(){
    sideNav.style.display='block';
    sideNav.style.width="75%";
    threeMenue.style.display="none";
})

crossx.addEventListener('click',function(){
    sideNav.style.display='none';
    sideNav.style.width="0%";
    threeMenue.style.display="block";
})