import { LightningElement, track } from 'lwc';
import getTasks from '@salesforce/apex/ToDoListController.getTasks';
import deleteTask from '@salesforce/apex/ToDoListController.deleteTask';
import findContacts from '@salesforce/apex/ToDoListController.findContacts';
import { NavigationMixin } from 'lightning/navigation';

 


export default class Todo extends NavigationMixin(LightningElement) {

    @track todoTasks={data:[]};

    connectedCallback(){
         this.syncData();
         setInterval( ()=>{
         this.syncData();
        },1000);
    }
    searchKey = '';
    handleKeyChange(event) {
        console.log("handleKeyChange")
        this.searchKey = event.target.value;
        if(this.searchKey === ''){
            this.syncData();
        }
    }

    filterList(){
        console.log("12filterList")
        findContacts({ searchKey: this.searchKey })
            .then((result) => {
                this.todoTasks.data = result;
            })
            .catch((error) => {
                alert("Error")
            });
    }
    
    getRecords(){
    getTasks()
    .then( res =>{
            this.todoTasks.data = res;
          //  console.log(res)
    })
    .catch(error => {
        console.log(error)
    });
    }
    
    @track error;
    deleteR(event) {
        let idToDelete = event.target.name;
         
        deleteTask({ taskId: idToDelete })
        .then(result => {
            alert('Ok')
        })
        .catch(error => {
            console.log(error)
        });
       
    }
    createTask(){
        this[NavigationMixin.Navigate](
            {
                type:'standard__objectPage',
                attributes:{
                    objectApiName:'Task',
                    actionName:'new'
                }
            }
        )
    }

    syncData() {
        //console.log('syncData')
      //  this.getRecords();
        this.filterList();
        this.changeColor();
    }
    editTask(event){
        let idToDelete = event.target.name;
        console.log('editTask id |'+idToDelete+'|')
        this[NavigationMixin.Navigate](
            {
                type:'standard__objectPage',
                attributes:{
                    recordId: idToDelete,
                    objectApiName:'Task',
                    actionName:'edit'
                }
            }
        )
    }
    changeColor(){
        console.log("--152changeColor--")
        /*
        let navbar = document.getElementById("navbaMr");
        console.log("--dggdr--")
        navbar=navbar.querySelectorAll('li');
        console.log("--wrwer--")

      navbar.forEach((item, index) => {
          console.log("--st--")
        console.log({ index, item })
        console.log("--end--")
      });
        console.log("--end--")
        */
    }
    
}