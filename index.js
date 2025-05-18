async function sendReminder(){
    return new Promise((resolve) => {
    setTimeout(()=>
    {
        console.log("Reminder: your task is due!");
        resolve("Reminder sent to user!");
    },3000);
    });
    }
    async function main() {
        try{
            const  message=await sendReminder();
            console.log(message);
        }catch(error){
            console.error("Error sending reminder",error);
        }  
    }
    main();


    //Question2 

    async function statusCheck(){
        return new Promise((resolve,reject) => {
            setTimeout(()=>{
                const isRunning=Math.random()>0.2;
                if(isRunning){
                    resolve("Server is running")
                }
                else{
                    reject("Server down")
                }
                  
                },1000)
               });
            }
         
    function serverMonitoring(){
        const intervalValid=setInterval(()=>{
            statusCheck().then((status)=>{
                console.log(status);
            })
            .catch((error)=>{
                console.log(error);
            })
        },5000);
        setTimeout(()=>{
            clearInterval(intervalValid);
            console.log("server monitoring stopped after 30 seconds")
        },30000);
    }
    serverMonitoring();

    //Question 3

    async function showNotifications(messages) {
        for (const message of messages) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log("Notification:", message);
        }
        console.log("All notifications sent");
    }
    
    const messages = ["Welcome!", "Check your inbox", "Update available"];
    showNotifications(messages);


    //Question 4
    async function fetchDataWithRetry() {
        const maxAttempts = 3;
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
          try {
            await new Promise((resolve, reject) =>
              setTimeout(() => reject(new Error("API error")), 1000)
            );
            return "Data fetched successfully";
          } catch (error) {
            console.log(`Attempt ${attempt} failed: ${error.message}`);
            if (attempt === maxAttempts) {
              console.log("Failed after three attempts");
              return;
            }
            await new Promise((resolve) => setTimeout(resolve, 2000));
          }
        }
      }
    fetchDataWithRetry().then((result) => result && console.log(result));


    //Question 5

    function launchProduct() {
        return Promise.resolve("Product is finally launched!");
    }
    
    function startCountdown(n) {
        const intervalId = setInterval(async () => {
            console.log(n);
            n--;
            if (n < 0) {
                clearInterval(intervalId);
                const result = await launchProduct();
                console.log(result);
            }
        }, 1000);
    }
    
    startCountdown(5);