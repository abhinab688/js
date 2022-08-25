function uploadToCrudCrud(event){
    event.preventDefault();
    const amount=event.target.amount.value;
    const description=event.target.description.value;
    const category=event.target.category.value;

    const obj={
        amount,
        description,
        category
    }
    axios.post("https://crudcrud.com/api/2f82681b881d411abc87437e20c450b9/expensedata",obj)
        .then((response) => {
            showUserOnScreen(obj)
            console.log(response)
        }).catch((err) => {
            console.log(err)
        });
}
window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/2f82681b881d411abc87437e20c450b9/expensedata")
        .then((response)=>{
            console.log(response)
            for(var i=0;i<response.data.length; i++){
                showUserOnScreen(response.data[i])
            }
        }).catch((err)=>{
            console.log(err)
        })
})

function showUserOnScreen(user){
    const parentNode=document.getElementById('details');
    const childHTML=`<li id=${user._id}> ${user.amount}- ${user.description}- ${user.category}
                        <button onClick=deleteUser('${user._id}')>Delete User</button> 
                        <button onClick=editUser('${user.amount}','${user.description}','${user.category}','${user._id}')>Edit User</button>
                    </li>`
    parentNode.innerHTML=parentNode.innerHTML + childHTML;
    
}
function deleteUser(userId){
    axios.delete(`https://crudcrud.com/api/2f82681b881d411abc87437e20c450b9/expensedata/${userId}`)
        .then((response)=>{
            removeUserFromScreen(userId)
            console.log(response)
        }).catch((err)=>{
            console.log(err)
        })
}
function removeUserFromScreen(userId){
    const parentNode=document.getElementById('details')
    const childNodeToBeDeleted=document.getElementById(userId)
    
    parentNode.removeChild(childNodeToBeDeleted);
    console.log(childNodeToBeDeleted)
}

function editUser(amt,des,cat,userId){
    document.getElementById('amount').value=amt;
    document.getElementById('description').value=des;
    document.getElementById('category').value=cat;
    deleteUser(userId);

}




