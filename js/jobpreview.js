(function () {
  // add file name to the label in input file field
  $("#resume").on("change", function () {
    //get the file name
    var fileName = $(this).val();
    //replace the "Choose a file" label
    $(this)
      .next(".custom-file-label")
      .html(fileName.replace("C:\\fakepath\\", " "));
  });

  let urlParams = new URLSearchParams(window.location.search);
  let id = urlParams.get("id");
  let jobTitle = "";

  let responsibilitiesElement = document.getElementById("responsibilities");

  // DOM Elements to update job details
  let titleElement = document.getElementById("jobtitle");
  let description = document.getElementById("description");
  let minqualifications = document.getElementById("qualifications");
  let location = document.getElementById("location");
  let experience = document.getElementById("experience");
  let salary = document.getElementById("salary");
  let jobType = document.getElementById("jobType");

  fetch(`https://agile-plateau-09650.herokuapp.com/jobopenings/${id}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //minimum qualifications
      let qualificationsHTML = "";
      if (data.requirements) {
        for (let qalify in data.requirements) {
          qualificationsHTML += `<li>
                            <span><i class="fa fa-check rounded-circle p-1"></i></span>
                            <p>${data.requirements[qalify]}</p>
                          </li>`;
        }
      }
      minqualifications.innerHTML = qualificationsHTML;

      //job description
      description.textContent = data.description;
      titleElement.textContent = data.title;
      jobTitle = data.title;
      // responsibilities
      let responsibilitiesHTML = "";
      if (data.requirements) {
        for (let res in data.requirements) {
          responsibilitiesHTML += `<li>
                                    <span><i class="fa fa-check rounded-circle p-1"></i></span>
                                     <p>${data.requirements[res]}</p>
                                   </li>`;
        }
      }
      responsibilitiesElement.innerHTML = responsibilitiesHTML;

      //job details
      location.textContent = data.location;
      experience.textContent = "-";
      salary.textContent = "Best in Industry";
      jobType.textContent = "Full-Time";
    });

  /* 

SUBMIT JOB APPLICATION FORM DATA

*/
  let jobApplicationForm = document.getElementById("jobApplication");
  // var urlParams = new URLSearchParams(window.location.search);
  // let jobTitle = urlParams.get('position');

  jobApplicationForm.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();
      jobApplicationForm.classList.add("was-validated");
      document
        .getElementById("submitApplicationButton")
        .setAttribute("disabled", true);
      document.getElementById("btnText").style.display = "none";
      document.getElementById("btnSpinner").style.display = "block";

      // if any errors enable send message button to re-send form data
      if (!jobApplication.checkValidity()) {
        document
          .getElementById("submitApplicationButton")
          .removeAttribute("disabled");
        document.getElementById("btnText").style.display = "block";
        document.getElementById("btnSpinner").style.display = "none";
      }

      // if no errors send form data to the API
      if (jobApplicationForm.checkValidity()) {
        //        let formData = new FormData(jobApplicationForm);
        // let data = {
        //   firstname: formData.get("firstname"),
        //   lastname: formData.get("lastname"),
        //   email: formData.get("email"),
        //   phone: formData.get("phone"),
        //   message: formData.get("message"),
        //   resume: formData.get("resume"),
        //   position: jobTitle,
        // };

        const fileField = document.querySelector('input[type="file"]');
        const firstName = document.querySelector("#firstname").value;
        const lastName = document.querySelector("#lastname").value;
        const email = document.querySelector("#email").value;
        const phone = document.querySelector("#phone").value;
        const message = document.querySelector("#message").value;
        //const countryCode = iti.getSelectedCountryData().dialCode;
        const countryCode = "91";
        let data = {
          firstname: firstName,
          lastname: lastName,
          email: email,
          phone: phone,
          subject: message,
          position: title,
          website: "virtech",
          country_code: countryCode,
          date: new Date(),
        };

        // const formData = new FormData();
        // formData.append("firstname", firstName);
        // formData.append("lastname", lastName);
        // formData.append("email", email);
        // formData.append("phone", phone);
        // formData.append("message", message);
        // formData.append("role", title);
        // formData.append("resume", fileField.files[0]);
        // formData.append("website", "virtech");
        // formData.append("countryCode", countryCode);

        // console.log(data);
        // fetch("https://agile-plateau-09650.herokuapp.com/jobapplications", {
        //   method: "post",
        //   headers: {
        //     "Content-type": "application/json",
        //   },
        //   body: JSON.stringify(data),
        // })
        //   .then(function (response) {
        //     document
        //       .getElementById("submitApplicationButton")
        //       .setAttribute("disabled", true);
        //     document.getElementById("btnText").style.display = "none";
        //     document.getElementById("btnSpinner").style.display = "block";
        //     return response.json();
        //   })
        //   .then(function (jsondata) {
        //     console.log(jsondata);
        //     $("#JobApplicationModal").modal("show");
        //   })
        //   .catch(function (error) {
        //     document.getElementById("errorAlert").textContent =
        //       "Something went wrong! Please try again";
        //   });

        // new strapi

        fetch("https://zyclyx-backend-api.herokuapp.com/job-applications/", {
          method: "post",
          body: JSON.stringify(data),
        })
          .then(function (response) {
            document
              .getElementById("submitApplicationButton")
              .setAttribute("disabled", true);
            document.getElementById("btnText").style.display = "none";
            document.getElementById("btnSpinner").style.display = "block";
            return response.json();
          })
          .then(function (jsondata) {
            // upload file
            // let fileData = new FormData();
            // fileData.append("files", fileField.files[0]);
            // fileData.append("refId", jsondata.id);
            // fileData.append("field", "resume");
            // fileData.append("ref", "job-applications");
            // fetch("https://zyclyx-backend-api.herokuapp.com/upload/", {
            //   method: "post",
            //   body: fileData,
            // })
            //   .then(function (res) {
            //     return res;
            //   })
            //   .then(function (data) {
            //     jobApplicationForm.reset();
            //     jobApplicationForm.classList.remove("was-validated");
            //     document.getElementById("btnText").style.display = "block";
            //     document.getElementById("btnSpinner").style.display = "none";
            //   });
          })
          .catch(function (error) {
            document.getElementById("errorAlert").textContent =
              "Something went wrong! Please try again";
            console.log(error);
          });
      }
    },
    false
  );
})();
