const port = document.location.host.split(":")[1];
const endpoint = `http://localhost:${port}/api/courses`;

/*axios get request*/
const getCourses = ()=>{
    axios({
        method: "get",
        url:endpoint 
    }).then(res => {
        showOutput(res);
    }).catch(error => {
        console.log(error);
    });
    console.log("Welcome to the api client project...");
} 

const getSingle = async()=>{
    const result = await axios(endpoint);
    return result.data[0];
};

/*axios post request*/
const addCourse = ()=>{
    axios.post(endpoint, {
        name:"Object Oriented Programming",
        code: "CSC601"
    })
    .then(function (response) {
        showOutput(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}

/*axios post request*/
const modifyCourse = async () => {
    const course = await getSingle();
    axios.put(`${endpoint}/${course.id}`, {
        code: "CSC211",
        name: "Algorithms and Data Structures"
    })
    .then(function(response){
        showOutput(response);
    })
    .catch(function(error){
        console.log(error);
    });
}

const deleteCourse = async () =>{
    const course = await getSingle();
    axios.delete(`${endpoint}/${course.id}`, {data: {id:course.id}})
    .then((response) => {
        showOutput(response);
    })
    .catch((error)=>{
        console.log(error);
    });
}

/*Display results*/
const showOutput = (res)=>{
    document.getElementById("divOutput").innerHTML = `
       <div class="card card-body mb-4">
         <h5>Status: ${res.status}</h5>
       </div>
  
       <div class="card mt-3">
          <div class="card-header success">
             <h4>Headers</h4>
          </div>
          <div class="card-body">
              <pre>${JSON.stringify(res.headers, null, 2)}</pre>
          </div>
       </div>
  
       <div class="card mt-3">
          <div class="card-header primary">
              <h4>Data</h4>
          </div>
          <div class="card-body">
              <pre>${JSON.stringify(res.data, null, 2)}</pre>
          </div>
       </div>
  
       <div class="card mt-3">
          <div class="card-header warning">
              <h4>Config</h4>
          </div>
          <div class="card-body">
              <pre>${JSON.stringify(res.config, null, 2)}</pre>
          </div>
       </div>
    `;  
}

//Show all courses when page loads
getCourses();
